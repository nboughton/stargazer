import { defineStore } from 'pinia';
import { ICustomOracle } from 'src/components/models';
import { exportFile } from 'quasar';
import { stripTags, now, deepCopy } from 'src/lib/util';

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
    save(oracle: ICustomOracle) {
      // Strip script tags from item texts
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      oracle.Table?.forEach((r, i) => (oracle.Table![i].Result = stripTags(r.Result)));

      const idx = this.data.findIndex((t) => t.$id === oracle.$id);
      idx >= 0 ? (this.data[idx] = deepCopy(oracle)) : this.data.push(deepCopy(oracle));
    },

    delete(oracle: ICustomOracle) {
      const id = oracle.$id;
      this.data.forEach((o, i) => {
        if (o.$id === id) this.data.splice(i, 1);
      });
    },

    exportData() {
      const data = JSON.stringify(strip(this.data));
      const status = exportFile(`Starforged-oracles-${now()}.json`, data, {
        mimeType: 'application/json',
      });
      if (status != true) alert(status);
    },

    loadData(file: File) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        let oracles = JSON.parse(ev.target?.result as string) as ICustomOracle[];
        if (oracles satisfies ICustomOracle[]) {
          oracles = strip(oracles);
          // Strip script tahgs
          oracles.forEach((o) => {
            // Check ID to either update or add new asset
            const idx = this.data.findIndex((t) => t.$id === o.$id);
            idx >= 0 ? (this.data[idx] = deepCopy(o)) : this.data.push(deepCopy(o));
          });
        } else {
          alert('This data does not satisfy the custom Oracles interface');
        }
      };
      reader.readAsText(file);
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'Stargazer2CustomOracles',
        storage: localStorage,
      },
    ],
  },
});
