import { defineStore } from 'pinia';
import { IAsset } from 'components/models';
import { db } from 'src/lib/db';
import { stripTags } from 'src/lib/util';

export const useAssets = defineStore({
  id: 'assets',

  state() {
    return {
      data: <IAsset[]>[],
    };
  },

  actions: {
    async populateStore() {
      await db.assets.count(); // This is a hack that pokes the db after a data load
      if ((await db.assets.count()) > 0) {
        try {
          const assets = await db.assets.toArray();
          // strip script tags
          assets.forEach((a, i) => {
            assets[i].items.forEach((item, index) => (assets[i].items[index].text = stripTags(item.text)));
          });

          this.data = assets;
        } catch (err) {
          console.log(err);
        }
      }
    },

    async save(asset: IAsset) {
      // Strip script tags from item texts
      asset.items.forEach((a, i) => (asset.items[i].text = stripTags(a.text)));

      const storeCopy = JSON.parse(JSON.stringify(asset)) as IAsset;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await db.assets.put(storeCopy).catch((err) => console.log(err));

      // repopulate store
      await this.populateStore();
    },

    async delete(asset: IAsset) {
      const id = asset.id;
      await db.assets.delete(id as string);
      this.data.forEach((asset, index) => {
        if (asset.id === id) {
          this.data.splice(index, 1);
        }
      });
    },

    async exportData() {
      const assets = await db.assets.toArray();
      // strip script tags
      assets.forEach((a, i) => {
        assets[i].items.forEach((item, index) => (assets[i].items[index].text = stripTags(item.text)));
      });

      const data = JSON.stringify(assets);
      const blob = new Blob([data], { type: 'text/plain' });
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      const anchor = document.createElement('a');

      const date = new Date();
      anchor.download = `Starforged-assets-${date.getTime() / 1000}.json`;
      anchor.href = window.URL.createObjectURL(blob);
      anchor.dataset.downloadurl = ['text/json', anchor.download, anchor.href].join(':');

      anchor.dispatchEvent(event);
    },

    async loadData(file: File) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const assets = JSON.parse(ev.target?.result as string) as IAsset[];
        // Strip script tags
        assets.forEach((a, i) => {
          assets[i].items.forEach((item, index) => (assets[i].items[index].text = stripTags(item.text)));
        });

        try {
          await db.assets.bulkPut(assets);
        } catch (err) {
          console.log(err);
        }
      };
      reader.readAsText(file);

      // Repopulate store with updated content
      await this.populateStore();
    },
  },
});
