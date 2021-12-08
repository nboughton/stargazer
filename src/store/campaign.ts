import { defineStore } from 'pinia';
import {
  ESectorOpts,
  ICampaign,
  ICreature,
  IDerelict,
  INPC,
  IPlanet,
  ISettlement,
  ISighting,
  IStar,
  IStarship,
  IVault,
} from 'components/models';
import { NewCampaign } from 'src/lib/campaign';
import { useConfig } from './config';
import { db } from 'src/lib/db';
import { useGoogle } from './google';

export const useCampaign = defineStore({
  id: 'campaign',

  state() {
    return {
      data: NewCampaign(),
    };
  },

  actions: {
    moveSighting(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].stars[index])) as ISighting;
      this.data.sectors[to.sector].cells[to.cell].sightings.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].sightings.splice(index, 1);
    },
    moveStar(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].stars[index])) as IStar;
      this.data.sectors[to.sector].cells[to.cell].stars.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].stars.splice(index, 1);
    },
    movePlanet(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].planets[index])) as IPlanet;
      this.data.sectors[to.sector].cells[to.cell].planets.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].planets.splice(index, 1);
    },
    moveSettlement(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(
        JSON.stringify(this.data.sectors[from.sector].cells[from.cell].settlements[index])
      ) as ISettlement;
      this.data.sectors[to.sector].cells[to.cell].settlements.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].settlements.splice(index, 1);
    },
    moveStarship(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].ships[index])) as IStarship;
      this.data.sectors[to.sector].cells[to.cell].ships.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].ships.splice(index, 1);
    },
    moveNPC(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].npcs[index])) as INPC;
      this.data.sectors[to.sector].cells[to.cell].npcs.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].npcs.splice(index, 1);
    },
    moveCreature(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(
        JSON.stringify(this.data.sectors[from.sector].cells[from.cell].creatures[index])
      ) as ICreature;
      this.data.sectors[to.sector].cells[to.cell].creatures.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].creatures.splice(index, 1);
    },
    moveDerelict(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(
        JSON.stringify(this.data.sectors[from.sector].cells[from.cell].derelicts[index])
      ) as IDerelict;
      this.data.sectors[to.sector].cells[to.cell].derelicts.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].derelicts.splice(index, 1);
    },
    moveVault(index: number, from: { sector: number; cell: string }, to: { sector: number; cell: string }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].vaults[index])) as IVault;
      this.data.sectors[to.sector].cells[to.cell].vaults.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].vaults.splice(index, 1);
    },

    removeObject(type: ESectorOpts, sector: number, cell: string, index: number) {
      this.data.sectors[sector].cells[cell][type].splice(index, 1);
    },

    appendToJournal(index: number, text: string) {
      this.data.journal[index].content += text;
    },

    exportJournal() {
      const doc = document.implementation.createHTMLDocument('Journal');

      this.data.journal.forEach((j) => {
        const div = doc.createElement('div');
        div.classList.add('entry');
        div.innerHTML = `<h3>${j.title}</h3><div class="content">${j.content}</div>`;

        doc.body.prepend(div);
      });

      const text = new XMLSerializer().serializeToString(doc);
      const blob = new Blob([text], { type: 'text/html' });
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      const anchor = document.createElement('a');

      const date = new Date();
      anchor.download = `Starforged-journal-${date.getTime() / 1000}.html`;
      anchor.href = window.URL.createObjectURL(blob);
      anchor.dataset.downloadurl = ['text/html', anchor.download, anchor.href].join(':');

      anchor.dispatchEvent(event);
    },

    async populateStore() {
      const config = useConfig();
      await config.populateStore();

      if ((await db.campaign.count()) > 0 && config.data.current !== '') {
        try {
          await this.load(config.data.current);
        } catch (err) {
          console.log(err);
        }
      } else {
        await this.new();
        await config.updateIndex();
      }
    },

    async new() {
      const config = useConfig();
      config.data.sector = 0;

      const newCam = NewCampaign();
      this.data = newCam;

      config.data.current = this.data.id;
      config.data.index.push({
        name: this.data?.name,
        id: this.data.id,
      });

      const storeCopy = JSON.parse(JSON.stringify(this.data)) as ICampaign;
      await db.campaign.put(storeCopy).catch((err) => console.log(err));
    },

    async save() {
      const storeCopy = JSON.parse(JSON.stringify(this.data)) as ICampaign;
      await db.campaign.update(this.data.id, storeCopy).catch((err) => console.log(err));

      const config = useConfig();
      await config.updateIndex();

      const google = useGoogle();
      await google.saveCampaign(this.data);
    },

    async loadFirst() {
      const config = useConfig();

      const allCampaigns = await db.campaign.toCollection().sortBy('name');
      const nextCampaign = allCampaigns[0];
      const nextCampaignId = nextCampaign?.id;
      if (nextCampaignId) {
        await this.load(nextCampaignId);
        config.data.current = nextCampaignId;
      } else {
        await this.new();
      }

      await config.updateIndex();
    },

    async load(id: string) {
      try {
        const campaign = await db.campaign.get(id);
        if (campaign) {
          this.data = campaign;
        } else {
          // we've entered bad state, rectify
          await this.loadFirst();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async delete(id: string, triggeredByGoogle = false) {
      try {
        const config = useConfig();

        // Remove from database
        await db.campaign.delete(id);

        if (!triggeredByGoogle) {
          const google = useGoogle();
          await google.deleteCampaign(id);
        }

        // If the deletion is for the active campaign, switch campaign
        if (config.data.current === id) {
          await this.loadFirst();
        }

        await config.updateIndex();
      } catch (err) {
        console.log(err);
      }
    },

    async exportData() {
      const data = JSON.stringify(await db.campaign.toArray());
      const blob = new Blob([data], { type: 'text/plain' });
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      const anchor = document.createElement('a');

      const date = new Date();
      anchor.download = `Starforged-campaign-${date.getTime() / 1000}.json`;
      anchor.href = window.URL.createObjectURL(blob);
      anchor.dataset.downloadurl = ['text/json', anchor.download, anchor.href].join(':');

      anchor.dispatchEvent(event);
    },

    async loadData(file: File) {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const campaigns = JSON.parse(ev.target?.result as string) as ICampaign[];
        try {
          await db.campaign.bulkPut(campaigns);
          const google = useGoogle();
          await google.syncFiles();
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
