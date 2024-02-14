import { defineStore } from 'pinia';
import { ISGAsset } from 'components/models';
import { deepCopy, now, stripTags } from 'src/lib/util';
import { exportFile } from 'quasar';

export const useAssets = defineStore({
  id: 'assets',

  state() {
    return {
      data: <ISGAsset[]>[],
    };
  },

  actions: {
    save(asset: ISGAsset) {
      // Strip script tags
      asset.items.forEach((item, i) => (asset.items[i].text = stripTags(item.text)));

      const idx = this.data.findIndex((a) => a.id && a.id == asset.id);
      idx >= 0 ? (this.data[idx] = deepCopy(asset)) : this.data.push(deepCopy(asset));
    },

    delete(id: string) {
      const idx = this.data.findIndex((t) => t.id && t.id === id);
      if (idx) this.data.splice(idx, 1);
    },

    exportData() {
      // strip script tags
      this.data.forEach((a, i) => {
        this.data[i].items.forEach((item, index) => (this.data[i].items[index].text = stripTags(item.text)));
      });

      const data = JSON.stringify(this.data);
      const status = exportFile(`Starforged-assets-${now()}.json`, data, {
        mimeType: 'application/json',
      });
      if (status != true) alert(status);
    },

    loadData(file: File) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const assets = JSON.parse(ev.target?.result as string) as ISGAsset[];
        if (assets satisfies ISGAsset[]) {
          // Strip script tags
          assets.forEach((a, i) => {
            assets[i].items.forEach((item, index) => (assets[i].items[index].text = stripTags(item.text)));

            // Check ID to either update or add new asset
            const idx = this.data.findIndex((t) => t.id && t.id === a.id);
            idx >= 0 ? (this.data[idx] = deepCopy(a)) : this.data.push(deepCopy(a));
          });
        } else {
          alert('This data does not satisfy the Asset interface');
        }
      };
      reader.readAsText(file);
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'Stargazer2CustomAssets',
        storage: localStorage,
      },
    ],
  },
});
