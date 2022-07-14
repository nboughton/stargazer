import { IConfig, ICampaign, ISGAsset, ICustomOracle } from 'components/models';
import Dexie from 'dexie';

export class StargazerDB extends Dexie {
  config: Dexie.Table<IConfig, number>;
  campaign: Dexie.Table<ICampaign, string>;
  assets: Dexie.Table<ISGAsset, string>;
  oracles: Dexie.Table<ICustomOracle, string>;

  constructor() {
    super('StargazerDB');

    this.version(2).stores({
      config: '&id',
      campaign: '&id',
      assets: '&id',
      oracles: '&$id',
    });

    this.config = this.table('config');
    this.campaign = this.table('campaign');
    this.assets = this.table('assets');
    this.oracles = this.table('oracles');
  }
}

export const db = new StargazerDB();
