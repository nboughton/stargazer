import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';

const MIME_FOLDER = 'application/vnd.google-apps.folder';
const STARGAZER_FOLDER = 'Stargazer';

const createStargazerFolderIfNotExists = async () => {
  const files = await gapi.client.drive.files.list({
    q: `mimeType='${MIME_FOLDER}' and trashed=false and name='${STARGAZER_FOLDER}'`,
  });

  if (files.result.files?.length) {
    // already exists
    return;
  }

  const createResult = await gapi.client.drive.files.create({
    resource: {
      name: STARGAZER_FOLDER,
      mimeType: MIME_FOLDER,
    },
  });
  if (createResult.status !== 200) {
    console.warn(`failed to create google folder: ${createResult.body}`);
  }
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
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        await createStargazerFolderIfNotExists();
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
