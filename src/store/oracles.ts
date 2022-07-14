import { defineStore } from 'pinia';
import { ICustomOracle } from 'src/components/models';
import { db } from 'src/lib/db';
import { exportFile } from 'quasar';
import { stripTags, now } from 'src/lib/util';

const strip = (oracles: ICustomOracle[]): ICustomOracle[] => {
  oracles.forEach((o, i) => {
    oracles[i].Table?.forEach((item, index) => {
      if (oracles[i].Table)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        oracles[i].Table![index].Result = stripTags(item.Result);
    });
  });

  return oracles;
};

export const useOracles = defineStore({
  id: 'oracles',

  state() {
    return {
      data: <ICustomOracle[]>[],
    };
  },

  actions: {
    async populateStore() {
      await db.oracles.count(); // This is a hack that pokes the db after a data load
      if ((await db.oracles.count()) > 0) {
        try {
          const oracles = await db.oracles.toArray();

          this.data = strip(oracles);
        } catch (err) {
          console.log(err);
        }
      }
    },

    async save(oracle: ICustomOracle) {
      // Strip script tags from item texts
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      oracle.Table?.forEach((r, i) => (oracle.Table![i].Result = stripTags(r.Result)));

      const storeCopy = JSON.parse(JSON.stringify(oracle)) as ICustomOracle;
      await db.oracles.put(storeCopy).catch((err) => console.log(err));

      // repopulate store
      await this.populateStore();
    },

    async delete(oracle: ICustomOracle) {
      const id = oracle.$id;
      await db.oracles.delete(id);
      this.data.forEach((oracle, index) => {
        if (oracle.$id === id) {
          this.data.splice(index, 1);
        }
      });
    },

    async exportData() {
      const oracles = await db.oracles.toArray();

      const data = JSON.stringify(strip(oracles));
      const status = exportFile(`Starforged-oracles-${now()}.json`, data, {
        mimeType: 'application/json',
      });
      if (status != true) alert(status);
    },

    loadData(file: File) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const oracles = JSON.parse(ev.target?.result as string) as ICustomOracle[];

        try {
          await db.oracles.bulkPut(strip(oracles));
          // Repopulate store with updated content
          await this.populateStore();
        } catch (err) {
          console.log(err);
        }
      };
      reader.readAsText(file);
    },
  },
});
