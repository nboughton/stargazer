/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { defineStore } from 'pinia';
import { ESectorOpts, ICampaign, ICampaigns, ICharacter } from 'components/models';

import { exportFile } from 'quasar';
import { deepCopy, now } from 'src/lib/util';
import { NewCampaign } from 'src/lib/campaign';
import { NewConfig } from 'src/lib/config';

const defCampaign = NewCampaign();

export const useCampaign = defineStore({
  id: 'campaign',

  state: () => ({
    config: NewConfig(),
    campaigns: <ICampaigns>{
      [defCampaign.id]: defCampaign,
    },
  }),

  actions: {
    moveItem<T extends never>(
      obj: T,
      type: ESectorOpts,
      index: number,
      from: { sector: number; cell: string },
      to: { sector: number; cell: string }
    ) {
      this.ca.sectors[to.sector].cells[to.cell][type].unshift(deepCopy(obj));
      this.ca.sectors[from.sector].cells[from.cell][type].splice(index, 1);
    },

    removeObject(type: ESectorOpts, sector: number, cell: string, index: number) {
      this.ca.sectors[sector].cells[cell][type].splice(index, 1);
    },

    appendToJournal(index: number, text: string) {
      this.ca.journal[index].content += text;
    },

    exportJournal() {
      const doc = document.implementation.createHTMLDocument('Journal');

      this.ca.journal.forEach((j) => {
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
      this.campaigns[c.id] = c;
      this.config.current.campaign = c.id;
    },

    delete(id: string) {
      if (this.camId === id) {
        Object.keys(this.campaigns).forEach((k) => {
          if (k != id) {
            this.config.current.campaign = k;
            return;
          }
        });
      }
      delete this.campaigns[id];
    },

    exportData() {
      const data = JSON.stringify(this.campaigns);
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
            if (v1campaigns satisfies ICampaign[]) {
              v1campaigns.forEach((c) => {
                this.campaigns[c.id] = deepCopy(c);
              });
            } else {
              alert('This does not look like Stargazer 1.x data');
            }
            break;
          case 2:
            const v2campaigns = JSON.parse(ev.target?.result as string) as ICampaigns;
            if (v2campaigns satisfies ICampaigns) {
              Object.keys(v2campaigns).forEach((key) => {
                this.campaigns[key] = deepCopy(v2campaigns[key]);
              });
            } else {
              alert('This does not look like Stargazer 2.x usable data');
            }
            break;

          default:
            alert('Unsupported version or version not specified');
        }
      };
      reader.readAsText(file);
    },
  },

  getters: {
    ch: (state): ICharacter => state.campaigns[state.config.current.campaign].character[state.config.current.character],
    ca: (state): ICampaign => state.campaigns[state.config.current.campaign],
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
