import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';
import { useConfig } from './config';
import { db } from 'src/lib/db';
import { ICampaign } from 'src/components/models';

const MIME_FOLDER = 'application/vnd.google-apps.folder';
const STARGAZER_FOLDER = 'Stargazer';

const isSignedIn = () => !!gapi.auth2?.getAuthInstance()?.isSignedIn.get();

const createStargazerFolderIfNotExists = async () => {
  const query = await gapi.client.drive.files.list({
    q: `mimeType='${MIME_FOLDER}' and trashed=false and name='${STARGAZER_FOLDER}'`,
  });

  if (query.result.files?.length) {
    return query.result.files[0].id;
  }

  const createResult = await gapi.client.drive.files.create({
    resource: {
      name: STARGAZER_FOLDER,
      mimeType: MIME_FOLDER,
    },
  });

  if (createResult.status === 200) {
    return createResult.result.id;
  }

  console.log(`failed to create google folder: ${createResult.body}`);
};

const getGoogleFileHeaders = async (folderId: string) => {
  const query = await gapi.client.drive.files.list({
    q: `trashed=false and '${folderId}' in parents`,
    fields: 'files/id,files/trashed,files/name,files/version',
  });
  const fileHeaders =
    query.result.files?.map((file) => ({
      id: file.name?.slice(0, -5) ?? '', // trim off '.json' to get our ID
      googleId: file.id ?? '',
      version: file.version ?? '1',
    })) ?? [];
  return fileHeaders;
};

const getGoogleFileHeader = async (folderId: string, contentId: string) => {
  const query = await gapi.client.drive.files.list({
    q: `trashed=false and '${folderId}' in parents and name='${contentId}.json'`,
    fields: 'files/id,files/trashed,files/name,files/version',
  });
  const fileHeaders =
    query.result.files?.map((file) => ({
      id: file.name?.slice(0, -5) ?? '', // trim off '.json' to get our ID
      googleId: file.id ?? '',
      version: file.version ?? '1',
    })) ?? [];
  return fileHeaders[0];
};

const downloadFile = async (googleFileId: string) => {
  const content = await gapi.client.drive.files.get({
    fileId: googleFileId,
    alt: 'media',
  });

  const campaign = JSON.parse(content.body) as ICampaign;
  await db.campaign.put(campaign);
};

const uploadFile = async (folderId: string, googleFileId: string | undefined, contentId: string) => {
  if (!googleFileId) {
    const createResult = await gapi.client.drive.files.create({
      resource: { name: `${contentId}.json`, parents: [folderId] },
      fields: 'id,version',
    });
    googleFileId = createResult.result.id ?? '';
  }

  const content = await db.campaign.get(contentId);

  await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${googleFileId}?uploadType=media&supportsAllDrives=true`,
    {
      method: 'PATCH',
      headers: new Headers({ Authorization: 'Bearer ' + gapi.auth.getToken().access_token }),
      body: JSON.stringify(content),
    }
  );
};

export const useGoogle = defineStore({
  id: 'google',

  state() {
    return {
      data: {
        googleDriveLinked: false,
      },
    };
  },

  actions: {
    // ! TODO: on sync - query google for unseen local IDs, filtering by deleted. if deleted, delete locally, otherwise continue to create in google
    // ! TODO: create conflict resolution strategy for when local and cloud both changed since last seen
    async syncFiles() {
      if (!isSignedIn()) return;

      const folderId = await createStargazerFolderIfNotExists();
      if (!folderId) return;

      const config = useConfig();
      await config.updateIndex(); // ensure index is up to date

      const googleHeaders = await getGoogleFileHeaders(folderId);
      const localHeaders = config.data.index;
      const googleHeaderMap = new Map(googleHeaders.map((h) => [h.id, h]));
      const localHeaderMap = new Map(localHeaders.map((h) => [h.id, h]));

      const downloadPromises = googleHeaders
        .filter((h) => !localHeaderMap.has(h.id)) // ! TODO: track and diff last-seen Google version as well as just not existing
        .map((h) => downloadFile(h.googleId));

      // ! TODO: filter uploads to only those changes since last Google upload (can't track that with version, needs thought)
      const uploadPromises = localHeaders.map((h) => uploadFile(folderId, googleHeaderMap.get(h.id)?.googleId, h.id));

      await Promise.all([...uploadPromises, ...downloadPromises]);
      await config.updateIndex();
    },

    async saveCampaign(campaign: ICampaign) {
      if (!isSignedIn()) return;

      const folderId = await createStargazerFolderIfNotExists();
      if (!folderId) return;

      const fileHeader = await getGoogleFileHeader(folderId, campaign.id);
      await uploadFile(folderId, fileHeader?.googleId, campaign.id);
    },

    async deleteCampaign(campaignId: string) {
      if (!isSignedIn()) return;

      const folderId = await createStargazerFolderIfNotExists();
      if (!folderId) return;

      const fileHeader = await getGoogleFileHeader(folderId, campaignId);
      if (!fileHeader) return;

      await gapi.client.drive.files.delete({ fileId: fileHeader.googleId });
    },

    async linkGoogleDrive() {
      await gapi.auth2.getAuthInstance().signIn();
      await this.syncFiles();
    },

    async unlinkGoogleDrive() {
      await gapi.auth2.getAuthInstance().signOut();
    },

    async populateStore() {
      const CLIENT_ID = '7921519518-hm1dn3gcoooatro47479dmq5h0feeb38.apps.googleusercontent.com';
      const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
      const SCOPES = 'https://www.googleapis.com/auth/drive';

      await new Promise<void>((resolve) => gapi.load('client:auth2', () => resolve()));
      await gapi.client.load('drive', 'v3');

      await gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      const googleAuth = gapi.auth2.getAuthInstance();
      this.data.googleDriveLinked = googleAuth.isSignedIn.get();
      googleAuth.isSignedIn.listen((signedIn) => (this.data.googleDriveLinked = signedIn));

      await this.syncFiles();
    },
  },
});
