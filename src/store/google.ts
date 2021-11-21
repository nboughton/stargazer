import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';
import { useConfig } from './config';
import { db } from 'src/lib/db';
import { NewCampaign } from 'src/lib/campaign';

const MIME_FOLDER = 'application/vnd.google-apps.folder';
const STARGAZER_FOLDER = 'Stargazer';

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
    fields: 'files/trashed,files/name,files/version',
  });
  const fileHeaders =
    query.result.files?.map((file) => ({
      id: file.name?.slice(0, -5) ?? '', // trim off '.json' to get our ID
      version: file.version ?? '1',
    })) ?? [];
  return fileHeaders;
};

const downloadFile = async (folderId: string, contentId: string) => {
  console.warn(folderId); // ! TODO: download content
  const tempContent = NewCampaign();
  tempContent.id = contentId; // Placeholder until content upload/download
  await db.campaign.put(tempContent);
};

const uploadFile = async (folderId: string, createHeader: boolean, contentId: string, content: unknown) => {
  if (createHeader) {
    await gapi.client.drive.files.create({
      resource: { name: `${contentId}.json`, parents: [folderId] },
      fields: 'id,version',
    });
    // ! TODO: upload content
  }

  console.log(content);
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
    // ! TODO: upload single on local campaign new/save
    // ! TODO: delete single on local delete
    // ! TODO: create conflict resolution strategy for when local and cloud both changed since last seen
    async syncFiles() {
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        return;
      }

      const folderId = await createStargazerFolderIfNotExists();
      if (!folderId) {
        console.log("couldn't reach google drive");
        return;
      }

      const config = useConfig();
      await config.updateIndex(); // ensure index is up to date

      const googleHeaders = await getGoogleFileHeaders(folderId);
      const localHeaders = config.data.index;
      const googleHeaderMap = new Map(googleHeaders.map((h) => [h.id, h]));
      const localHeaderMap = new Map(localHeaders.map((h) => [h.id, h]));

      const downloadPromises = googleHeaders
        .filter((h) => !localHeaderMap.has(h.id)) // ! TODO: track and diff last-seen Google version as well as just not existing
        .map((h) => downloadFile(folderId, h.id));

      // ! TODO: filter uploads to only those changes since last Google upload (can't track that with version, needs thought)
      const uploadPromises = localHeaders.map((h) => uploadFile(folderId, !googleHeaderMap.has(h.id), h.id, ''));

      await Promise.all([...uploadPromises, ...downloadPromises]);
      await config.updateIndex();
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
