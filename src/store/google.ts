import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';
import { useConfig } from './config';
import { db } from 'src/lib/db';
import { ICampaign } from 'src/components/models';
import { useCampaign } from './campaign';

const isSignedIn = () => !!gapi.auth2?.getAuthInstance()?.isSignedIn.get();

const isFulfilled = <T>(res: PromiseSettledResult<T>): res is PromiseFulfilledResult<T> => res.status === 'fulfilled';

const mapGoogleFileHeader = (file: gapi.client.drive.File) => ({
  id: file.name?.slice(0, -5) ?? '', // trim off '.json' to get our ID
  googleId: file.id ?? '',
  version: Number(file.version ?? '1'),
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

const downloadFile = async (googleFileId: string, lastSeenGoogleVersion: number) => {
  const content = await gapi.client.drive.files.get({
    fileId: googleFileId,
    alt: 'media',
  });

  if (!content.body) {
    return;
  }
  try {
    const campaign = JSON.parse(content.body) as ICampaign;
    campaign.lastSeenGoogleVersion = lastSeenGoogleVersion;
    await db.campaign.put(campaign);
  } catch (e) {
    console.log(e);
  }
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
  const header = await gapi.client.drive.files.get({ fileId: googleFileId, fields: 'version' });
  const campaignPatch = { lastSeenGoogleVersion: Number(header.result.version ?? 0) };
  await db.campaign.update(contentId, campaignPatch);
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

      const deletedFromGoogle = await Promise.allSettled(checkForDeletedPromises);
      const deletedFromGoogleMap = new Map(deletedFromGoogle.filter(isFulfilled).map((h) => [h.value[0]?.id, h.value]));

      // Upload local campaigns that are never seen in Google. Delete local campaigns that are seen in Google as deleted.
      const uploadOrDeletePromises = localHeaders
        .filter((h) => h.lastSeenGoogleVersion >= (googleHeaderMap.get(h.id)?.version ?? -1))
        .map((h) =>
          deletedFromGoogleMap.has(h.id)
            ? db.campaign.delete(h.id)
            : uploadFile(googleHeaderMap.get(h.id)?.googleId, h.id)
        );

      // Download campaigns that are in google but not in local
      const downloadPromises = googleHeaders
        .filter((h) => h.version > (localHeaderMap.get(h.id)?.lastSeenGoogleVersion ?? -1))
        .map((h) => downloadFile(h.googleId, h.version));

      await Promise.allSettled([...uploadOrDeletePromises, ...downloadPromises]);

      const campaign = useCampaign();
      await campaign.populateStore(); // Refresh with updated data
      await config.updateIndex();
    },

    async autoSyncFiles() {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000 * 60));
      await this.syncFiles();
      await this.autoSyncFiles();
    },

    async saveCampaign(campaign: ICampaign) {
      if (!isSignedIn()) return;

      const fileHeader = (await getGoogleFileHeaders(false, campaign.id))[0];
      await uploadFile(fileHeader?.googleId, campaign.id);
    },

    async deleteCampaign(campaignId: string) {
      if (!isSignedIn()) return;

      const fileHeader = (await getGoogleFileHeaders(false, campaignId))[0];
      if (fileHeader) {
        await gapi.client.drive.files.delete({ fileId: fileHeader.googleId });
      }
    },

    async linkGoogleDrive() {
      await gapi.auth2.getAuthInstance().signIn();
      await this.syncFiles();
    },

    async unlinkGoogleDrive() {
      await gapi.auth2.getAuthInstance().signOut();
    },

    async populateStore() {
      await new Promise<void>((resolve) => gapi.load('client:auth2', () => resolve()));
      await gapi.client.load('drive', 'v3');
      await gapi.client.init({
        clientId: '7921519518-l6mcj94tjdnfbrje2dn7ttiu9dpbaoso.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.appdata',
      });

      const googleAuth = gapi.auth2.getAuthInstance();
      this.data.googleDriveLinked = googleAuth.isSignedIn.get();
      googleAuth.isSignedIn.listen((signedIn) => (this.data.googleDriveLinked = signedIn));

      await this.syncFiles();
      void this.autoSyncFiles(); // void, because we don't want to block the caller on the infinite poll
    },
  },
});
