import { defineStore } from 'pinia';
import { ISGAsset } from 'components/models';
import { now, stripTags } from 'src/lib/util';
import { exportFile } from 'quasar';

export const useAssets = defineStore({
  id: 'assets',

  state() {
    return {
      data: <ISGAsset[]>[],
    };
  },

  actions: {
    new() {
      // add new asset
    },

    delete(id: string) {
      // remove asset
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
        // Strip script tags
        assets.forEach((a, i) => {
          this.data[i].items.forEach((item, index) => (this.data[i].items[index].text = stripTags(item.text)));
        });
      };
      reader.readAsText(file);
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'StargazerCustomAssets',
        storage: localStorage,
      },
    ],
  },
});
