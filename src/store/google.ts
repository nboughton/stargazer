import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';
import { useConfig } from './config';
import { db } from 'src/lib/db';
import { ICampaign } from 'src/components/models';

const isSignedIn = () => !!gapi.auth2?.getAuthInstance()?.isSignedIn.get();

const mapGoogleFileHeader = (file: gapi.client.drive.File) => ({
  id: file.name?.slice(0, -5) ?? '', // trim off '.json' to get our ID
  googleId: file.id ?? '',
  version: file.version ?? '1',
});

const getGoogleFileHeaders = async (trashed: boolean, contentId?: string) => {
  const query = await gapi.client.drive.files.list({
    spaces: 'appDataFolder',
    q: `trashed=${String(trashed)}` + (contentId ? ` and name='${contentId}.json'` : ''),
    fields: 'files/id,files/trashed,files/name,files/version',
  });
  const fileHeaders = query.result.files?.map((file) => mapGoogleFileHeader(file)) ?? [];
  return fileHeaders;
};

const downloadFile = async (googleFileId: string) => {
  const content = await gapi.client.drive.files.get({
    fileId: googleFileId,
    alt: 'media',
  });
  const campaign = JSON.parse(content.body) as ICampaign;
  await db.campaign.put(campaign);
};

const uploadFile = async (googleFileId: string | undefined, contentId: string) => {
  if (!googleFileId) {
    const createResult = await gapi.client.drive.files.create({
      resource: { name: `${contentId}.json`, parents: ['appDataFolder'] },
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
    // ! TODO: create conflict resolution strategy for when local and cloud both changed since last seen
    async syncFiles() {
      if (!isSignedIn()) return;

      const config = useConfig();
      await config.updateIndex(); // ensure index is up to date

      const googleHeaders = await getGoogleFileHeaders(false);
      const localHeaders = config.data.index;
      const googleHeaderMap = new Map(googleHeaders.map((h) => [h.id, h]));
      const localHeaderMap = new Map(localHeaders.map((h) => [h.id, h]));

      const checkForDeletedPromises = localHeaders
        .filter((h) => !googleHeaderMap.has(h.id))
        .map((h) => getGoogleFileHeaders(true, h.id));

      const deletedFromGoogle = await Promise.all(checkForDeletedPromises);
      const deletedFromGoogleMap = new Map(deletedFromGoogle.map((h) => [h[0]?.id, null]));

      // ! TODO: The below refers to bi-directional version checking to avoid as much as possible overwriting newer content with older content
      // ! TODO: track and diff last-seen Google version as well as just not existing
      // ! TODO: filter uploads to only those changes since last Google upload (can't track that with version, needs thought)

      // Upload campaigns that are in local and never seen in Google. Delete campaigns that are deleted from Google without having been replaced
      const uploadOrDeletePromises = localHeaders.map((h) =>
        deletedFromGoogleMap.has(h.id)
          ? db.campaign.delete(h.id)
          : uploadFile(googleHeaderMap.get(h.id)?.googleId, h.id)
      );

      // Download campaigns that are in google but not in local
      const downloadPromises = googleHeaders
        .filter((h) => !localHeaderMap.has(h.id))
        .map((h) => downloadFile(h.googleId));

      await Promise.all([...uploadOrDeletePromises, ...downloadPromises]);
      await config.updateIndex();
    },

    async saveCampaign(campaign: ICampaign) {
      if (!isSignedIn()) return;

      const fileHeader = (await getGoogleFileHeaders(false, campaign.id))[0];
      await uploadFile(fileHeader?.googleId, campaign.id);
    },

    async deleteCampaign(campaignId: string) {
      if (!isSignedIn()) return;

      const fileHeader = (await getGoogleFileHeaders(false, campaignId))[0];
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
      const SCOPES = 'https://www.googleapis.com/auth/drive.appdata';

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
