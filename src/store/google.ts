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

const getGoogleFileHeaders = async (contentIds?: string[]) => {
  const fileNames = contentIds?.map((id) => `name='${id}.json'`).join(' or ');
  const query = await gapi.client.drive.files.list({
    spaces: 'appDataFolder',
    q: 'trashed=false' + (fileNames ? ` and (${fileNames})` : ''),
    fields: 'files/id,files/trashed,files/name,files/version',
  });
  const fileHeaders = query.result.files?.map((file) => mapGoogleFileHeader(file)) ?? [];
  return fileHeaders;
};

const downloadFile = async (googleFileId: string, contentId: string, lastSeenGoogleVersion: number) => {
  const content = await gapi.client.drive.files.get({
    fileId: googleFileId,
    alt: 'media',
  });

  try {
    console.warn(content.body);
    if (content.body !== 'deleted') {
      const campaign = JSON.parse(content.body) as ICampaign;
      await db.campaign.put(campaign);
    } else {
      await db.campaign.delete(contentId);
    }
    await db.googleSyncState.put({
      id: contentId,
      lastSeenGoogleVersion: lastSeenGoogleVersion,
      uploadedToGoogle: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const uploadFile = async (googleFileId: string | undefined, contentId: string, content: unknown) => {
  if (!googleFileId) {
    const createResult = await gapi.client.drive.files.create({
      resource: { name: `${contentId}.json`, parents: ['appDataFolder'] },
      fields: 'id,version',
    });
    googleFileId = createResult.result.id ?? '';
  }

  await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${googleFileId}?uploadType=media&supportsAllDrives=true`,
    {
      method: 'PATCH',
      headers: new Headers({ Authorization: 'Bearer ' + gapi.auth.getToken().access_token }),
      body: content ? JSON.stringify(content) : 'deleted',
    }
  );
  const header = await gapi.client.drive.files.get({ fileId: googleFileId, fields: 'version' });
  await db.googleSyncState.put({
    id: contentId,
    lastSeenGoogleVersion: Number(header.result.version ?? 0),
    uploadedToGoogle: true,
  });
};

const uploadCampaign = async (googleFileId: string | undefined, contentId: string) => {
  const content = await db.campaign.get(contentId);
  await uploadFile(googleFileId, contentId, content);
};

const deleteGoogleFile = async (googleFileId: string | undefined, contentId: string) => {
  await uploadFile(googleFileId, contentId, undefined);
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

      const googleHeaders = await getGoogleFileHeaders();
      const localHeaders = config.data.index;
      const googleHeaderMap = new Map(googleHeaders.map((h) => [h.id, h]));

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
          return uploadCampaign(googleHeaderMap.get(h.id)?.googleId, h.id);
        });

      // Download/delete campaigns that are more up to date in Google than local
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
          return downloadFile(h.googleId, h.id, h.version);
        });

      await Promise.allSettled([...uploadPromises, ...downloadPromises]);

      await campaign.populateStore(); // Refresh with updated data
      await config.updateIndex();
    },

    async autoSyncFiles() {
      await sleep(1000 * 60);
      await this.syncFiles();
      await this.autoSyncFiles();
    },

    async saveCampaign(campaign: ICampaign) {
      if (!isSignedIn()) {
        const statePatch = { uploadedToGoogle: false };
        await db.campaign.update(campaign.id, statePatch);
        return;
      }

      const fileHeader = (await getGoogleFileHeaders([campaign.id]))[0];
      const googleSyncState = await db.googleSyncState.get(campaign.id);
      if (fileHeader?.version > (googleSyncState?.lastSeenGoogleVersion ?? -1)) {
        console.warn('save conflict', fileHeader, campaign, googleSyncState);
        return;
      }
      await uploadCampaign(fileHeader?.googleId, campaign.id);
    },

    async deleteCampaign(campaignId: string) {
      if (!isSignedIn()) return;

      const fileHeader = (await getGoogleFileHeaders([campaignId]))[0];
      if (fileHeader) {
        const googleSyncState = await db.googleSyncState.get(campaignId);
        if (fileHeader.version > (googleSyncState?.lastSeenGoogleVersion ?? -1)) {
          console.warn('delete conflict', fileHeader, googleSyncState);
          return;
        }
        await deleteGoogleFile(fileHeader.googleId, fileHeader.id);
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
