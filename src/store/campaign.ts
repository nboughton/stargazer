import { defineStore } from 'pinia';
import { ESectorOpts, ICampaign, IConfig } from 'components/models';
import { exportFile } from 'quasar';
import { deepCopy, now } from 'src/lib/util';
import { NewCampaign } from 'src/lib/campaign';

interface ICampaigns {
  [index: string]: ICampaign;
}

export const useCampaign = defineStore({
  id: 'campaign',

  state: () => ({
    config: {} as IConfig,
    data: {} as ICampaigns,
  }),

  actions: {
    moveItem<T extends never>(
      obj: T,
      type: ESectorOpts,
      index: number,
      from: { sector: number; cell: string },
      to: { sector: number; cell: string }
    ) {
      this.data[this.camId].sectors[to.sector].cells[to.cell][type].unshift(deepCopy(obj));
      this.data[this.camId].sectors[from.sector].cells[from.cell][type].splice(index, 1);
    },

    removeObject(type: ESectorOpts, sector: number, cell: string, index: number) {
      this.data[this.camId].sectors[sector].cells[cell][type].splice(index, 1);
    },

    appendToJournal(index: number, text: string) {
      this.data[this.camId].journal[index].content += text;
    },

    exportJournal() {
      const doc = document.implementation.createHTMLDocument('Journal');

      this.data[this.camId].journal.forEach((j) => {
        const div = doc.createElement('div');
        div.classList.add('entry');
        div.innerHTML = `<h3>${j.title}</h3><div class="content">${j.content}</div>`;

        doc.body.prepend(div);
      });

      const text = new XMLSerializer().serializeToString(doc);
      const status = exportFile(`Starforged-journal-${now()}.html`, text, {
        mimeType: 'text/html',
      });
      if (status != true) alert(status);
    },

    // this is where the functions that will need to migrate data into the new store begin
    new() {
      const c = NewCampaign();
      this.data[c.id] = c;
      this.config.current.campaign = c.id;
    },

    delete(id: string) {
      if (this.camId === id) {
        Object.keys(this.data).forEach((k) => {
          if (k != id) {
            this.config.current.campaign = k;
            return;
          }
        });
      }
      delete this.data[id];
    },

    exportData() {
      const data = JSON.stringify(this.data);
      const status = exportFile(`Starforged-2-campaign-${now()}.json`, data, {
        mimeType: 'application/json',
      });
      if (status != true) alert(status);
    },

    loadData(file: File, version: number) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        switch (version) {
          case 1:
            const v1campaigns = JSON.parse(ev.target?.result as string) as ICampaign[];
            v1campaigns.forEach((c) => {
              this.data[c.id] = deepCopy(c);
            });
            break;
          case 2:
            const v2campaigns = JSON.parse(ev.target?.result as string) as ICampaigns;
            Object.keys(v2campaigns).forEach((key) => {
              this.data[key] = deepCopy(v2campaigns[key]);
            });
            break;
        }
      };
      reader.readAsText(file);
    },
  },

  getters: {
    camId: (state): string => state.config.current.campaign,
    charId: (state): number => state.config.current.character,
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'StargazerCampaign',
        storage: localStorage,
      },
    ],
  },
});
