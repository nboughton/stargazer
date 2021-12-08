import { IConfig, ICampaign, IAsset, IGoogleSyncState } from 'components/models';
import Dexie from 'dexie';

export class StargazerDB extends Dexie {
  config: Dexie.Table<IConfig, number>;
  campaign: Dexie.Table<ICampaign, string>;
  assets: Dexie.Table<IAsset, string>;
  googleSyncState: Dexie.Table<IGoogleSyncState, string>;

  constructor() {
    super('StargazerDB');

    this.version(1).stores({
      config: '&id',
      campaign: '&id',
      assets: '&id',
    });

    this.version(2).stores({
      config: '&id',
      campaign: '&id',
      assets: '&id',
      googleSyncState: '&id',
    });

    this.config = this.table('config');
    this.campaign = this.table('campaign');
    this.assets = this.table('assets');
    this.googleSyncState = this.table('googleSyncState');
  }
}

export const db = new StargazerDB();
