import { IConfig, ICampaign, IAsset } from 'components/models';
import Dexie from 'dexie';

export class StargazerDB extends Dexie {
  config: Dexie.Table<IConfig, number>;
  campaign: Dexie.Table<ICampaign, string>;
  assets: Dexie.Table<IAsset, string>;

  constructor() {
    super('StargazerDB');

    this.version(1).stores({
      config: '&id',
      campaign: '&id',
      assets: '&id',
    });

    this.config = this.table('config');
    this.campaign = this.table('campaign');
    this.assets = this.table('assets');
  }
}

export const db = new StargazerDB();
