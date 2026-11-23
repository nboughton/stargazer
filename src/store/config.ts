import { defineStore } from 'pinia';
import { IConfig, isAppLocale } from 'components/models';
import { NewConfig } from 'src/lib/config';
import { db } from 'src/lib/db';

export const useConfig = defineStore({
  id: 'config',

  state() {
    return {
      data: NewConfig(),
    };
  },

  actions: {
    async populateStore() {
      if ((await db.config.count()) > 0) {
        try {
          const loaded = await db.config.where('id').equals(1).first();
          if (loaded) {
            this.data = loaded;
          }
          // Remove this on release
          if (!this.data.map) {
            this.data.map = {
              height: 400,
              width: 800,
              hexSize: 20,
              animations: false,
              starfield: true,
            };
          }
          if (!isAppLocale(this.data.locale)) {
            this.data.locale = 'en-US';
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        const conf = NewConfig();
        this.data = conf;
        await db.config.put(conf).catch((err) => console.log(err));
      }
    },

    async save() {
      const storeCopy = JSON.parse(JSON.stringify(this.data)) as IConfig;
      await db.config.update(1, storeCopy).catch((err) => console.log(err));
    },

    async updateIndex() {
      const campaigns = await db.campaign.toArray();
      this.data.index = campaigns.map((c) => ({
        name: c.name,
        id: c.id,
      }));
    },
  },
});
