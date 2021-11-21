import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';

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
    async linkGoogleDrive() {
      const googleAuth = gapi.auth2.getAuthInstance();
      if (googleAuth !== undefined && !this.data.googleDriveLinked) {
        await googleAuth.signIn();
      }
    },

    async unlinkGoogleDrive() {
      const googleAuth = gapi.auth2.getAuthInstance();
      if (googleAuth !== undefined && this.data.googleDriveLinked) {
        await googleAuth.signOut();
      }
    },

    async populateStore() {
      const CLIENT_ID = '7921519518-hm1dn3gcoooatro47479dmq5h0feeb38.apps.googleusercontent.com';
      const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
      const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

      await new Promise<void>((resolve) => {
        gapi.load('client:auth2', () => resolve());
      });

      await gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      const googleAuth = gapi.auth2.getAuthInstance();
      this.data.googleDriveLinked = googleAuth.isSignedIn.get();
      googleAuth.isSignedIn.listen((signedIn) => (this.data.googleDriveLinked = signedIn));
    },
  },
});
