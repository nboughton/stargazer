import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';
import { useConfig } from './config';
import { db } from 'src/lib/db';
import { ICampaign } from 'src/components/models';
import { useCampaign } from './campaign';
import { sleep } from '../lib/util';

const isSignedIn = () => !!gapi.auth2?.getAuthInstance()?.isSignedIn.get();

const mapGoogleFileHeader = (file: gapi.client.drive.File) => ({
  id: file.name?.slice(0, -5) ?? '', // trim off '.json' to get our ID
  googleId: file.id ?? '',
  version: Number(file.version ?? '1'),
});

const getGoogleFileHeaders = async (trashed: boolean, contentIds?: string[]) => {
  const fileNames = contentIds?.map((id) => `name='${id}.json'`).join(' or ');
  const query = await gapi.client.drive.files.list({
    spaces: 'appDataFolder',
    q: `trashed=${String(trashed)}` + (fileNames ? `and (${fileNames})` : ''),
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

  try {
    const campaign = JSON.parse(content.body) as ICampaign;
    await db.campaign.put(campaign);
    await db.googleSyncState.put({
      id: campaign.id,
      lastSeenGoogleVersion: lastSeenGoogleVersion,
      uploadedToGoogle: true,
    });
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
  await db.googleSyncState.put({
    id: contentId,
    lastSeenGoogleVersion: Number(header.result.version ?? 0),
    uploadedToGoogle: true,
  });
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

      const potentiallyDeletedIds = localHeaders.filter((h) => !googleHeaderMap.has(h.id)).map((h) => h.id);

      const deletedFromGoogle = await getGoogleFileHeaders(true, potentiallyDeletedIds);
      const deletedFromGoogleMap = new Map(deletedFromGoogle.map((h) => [h.id, h]));

      const campaign = useCampaign();

      const googleSyncStates = await db.googleSyncState.toArray();
      const googleSyncStatesMap = new Map(googleSyncStates.map((h) => [h.id, h]));

      // Upload local campaigns that are never seen in Google. Delete local campaigns that are seen in Google as deleted.
      const uploadPromises = localHeaders
        .filter((h) => !googleSyncStatesMap.get(h.id)?.uploadedToGoogle)
        .map((h) => {
          const lastSeenGoogleVersion = googleSyncStatesMap.get(h.id)?.lastSeenGoogleVersion ?? -1;
          const conflict = lastSeenGoogleVersion < (googleHeaderMap.get(h.id)?.version ?? -1);
          if (conflict) {
            // TODO: Queue conflict handler
            console.warn('upload conflict', googleSyncStatesMap.get(h.id), h, googleHeaderMap.get(h.id));
            return Promise.resolve();
          }
          console.warn('upload', googleSyncStatesMap.get(h.id), h, googleHeaderMap.get(h.id));
          return uploadFile(googleHeaderMap.get(h.id)?.googleId, h.id);
        });

      const deletePromises = localHeaders
        .filter((h) => deletedFromGoogleMap.has(h.id))
        .map((h) => {
          const googleSyncState = googleSyncStatesMap.get(h.id);
          const uploadedToGoogle = googleSyncState ? googleSyncState.uploadedToGoogle : false;
          const conflict = !uploadedToGoogle;
          if (conflict) {
            // TODO: Queue conflict handler
            console.warn('delete conflict', h, googleHeaderMap.get(h.id));
            return Promise.resolve();
          }
          console.warn('delete', h, googleHeaderMap.get(h.id));
          return campaign.delete(h.id, true);
        });

      // Download campaigns that are in google but not in local
      const downloadPromises = googleHeaders
        .filter((h) => h.version > (googleSyncStatesMap.get(h.id)?.lastSeenGoogleVersion ?? -1))
        .map((h) => {
          const googleSyncState = googleSyncStatesMap.get(h.id);
          const conflict = googleSyncState && !googleSyncState.uploadedToGoogle;
          if (conflict) {
            // TODO: Queue conflict handler
            console.warn('download conflict', googleSyncStatesMap, googleSyncState, h);
            return Promise.resolve();
          }
          console.warn('download', googleSyncStatesMap, googleSyncState, h);
          return downloadFile(h.googleId, h.version);
        });

      await Promise.allSettled([...uploadPromises, ...downloadPromises, ...deletePromises]);

      await campaign.populateStore(); // Refresh with updated data
      await config.updateIndex();
    },

    async autoSyncFiles() {
      await sleep(1000 * 60);
      await this.syncFiles();
      await this.autoSyncFiles();
    },

    async saveCampaign(campaign: ICampaign) {
      if (!isSignedIn()) return;

      const fileHeader = (await getGoogleFileHeaders(false, [campaign.id]))[0];
      const googleSyncState = await db.googleSyncState.get(campaign.id);
      if (fileHeader?.version > (googleSyncState?.lastSeenGoogleVersion ?? -1)) {
        console.warn('save conflict', fileHeader, campaign, googleSyncState);
        return;
      }
      console.warn('saving');
      await uploadFile(fileHeader?.googleId, campaign.id);
    },

    async deleteCampaign(campaignId: string) {
      if (!isSignedIn()) return;

      const fileHeader = (await getGoogleFileHeaders(false, [campaignId]))[0];
      if (fileHeader) {
        const googleSyncState = await db.googleSyncState.get(campaignId);
        if (fileHeader.version > (googleSyncState?.lastSeenGoogleVersion ?? -1)) {
          console.warn('delete conflict', fileHeader, googleSyncState);
          return;
        }

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
