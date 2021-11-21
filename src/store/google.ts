import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';
import { useConfig } from './config';

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
      id: file.name?.slice(0, -5), // trim off '.json' to get our ID
      version: file.version,
    })) ?? [];
  return new Map(fileHeaders.map((file) => [file.id, file]));
};

const uploadFile = async (folderId: string, createHeader: boolean, contentId: string, content: unknown) => {
  if (createHeader) {
    const result = await gapi.client.drive.files.create({
      resource: { name: `${contentId}.json`, parents: [folderId] },
      fields: 'id,version',
    });
    return result;
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
    async syncFiles() {
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        return;
      }

      const folderId = await createStargazerFolderIfNotExists();
      if (!folderId) {
        console.log("couldn't reach google drive");
        return;
      }

      const googleFileHeaders = await getGoogleFileHeaders(folderId);

      const config = useConfig();
      const localFileHeaders = config.data.index;
      const uploadPromises = localFileHeaders.map((header) =>
        uploadFile(folderId, !googleFileHeaders.has(header.id), header.id, '')
      );
      await Promise.all(uploadPromises);
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
