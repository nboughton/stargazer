import { defineStore } from 'pinia';
import { ICampaign, ICreature, IDerelict, INPC, IPlanet, ISectorCell, ISettlement, IStar, IStarship, IVault } from 'components/models';
import { NewCampaign } from 'src/lib/campaign';
import { useConfig } from './config';
import { db } from 'src/lib/db';

export const useCampaign = defineStore({
  id: 'campaign',

  state() {
    return {
      data: NewCampaign(),
    };
  },

  actions: {
    unsetPlayerLocation() {
      let done = false;
      this.data.sectors.forEach((s, sI) => {
        s.hexes.forEach((h, hI) => {
          if (h.player) {
            this.data.sectors[sI].hexes[hI].player = false;
            done = true;
            return;
          }
        });
        if (done) return;
      });
    },

    unlinkCell(id: string) {
      let found = false;
      this.data.sectors.forEach((s, sI) => {
        s.hexes.forEach((h, hI) => {
          if (h.id === id) {
            found = true;
            this.data.sectors[sI].hexes[hI].id = '';
            return;
          }
        });
        if (found) return;
      });
    },

    // Returns a copy of a cell found by id string
    getCell(id: string): ISectorCell {
      let cell = <ISectorCell>{};
      let found = false;
      this.data.sectors.forEach((s) => {
        s.cells.forEach((c) => {
          if (c.id === id) {
            found = true;
            cell = JSON.parse(JSON.stringify(c)) as ISectorCell;
            return;
          }
        });
        if (found) return;
      });
      return cell;
    },

    // returns the sector/cell numbers from an ID search
    getCellLocation(id: string): { sector: number; cell: number; found: boolean } {
      let out = { sector: 0, cell: 0, found: false };
      this.data.sectors.forEach((s, sI) => {
        s.cells.forEach((c, cI) => {
          if (c.id === id) {
            out = { sector: sI, cell: cI, found: true };
            return;
          }
        });
        if (out.found) return;
      });
      return out;
    },

    moveStar(index: number, from: { sector: number; cell: number }, to: { sector: number; cell: number }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].stars[index])) as IStar;
      this.data.sectors[to.sector].cells[to.cell].stars.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].stars.splice(index, 1);
    },
    movePlanet(index: number, from: { sector: number; cell: number }, to: { sector: number; cell: number }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].planets[index])) as IPlanet;
      this.data.sectors[to.sector].cells[to.cell].planets.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].planets.splice(index, 1);
    },
    moveSettlement(index: number, from: { sector: number; cell: number }, to: { sector: number; cell: number }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].settlements[index])) as ISettlement;
      this.data.sectors[to.sector].cells[to.cell].settlements.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].settlements.splice(index, 1);
    },
    moveStarship(index: number, from: { sector: number; cell: number }, to: { sector: number; cell: number }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].ships[index])) as IStarship;
      this.data.sectors[to.sector].cells[to.cell].ships.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].ships.splice(index, 1);
    },
    moveNPC(index: number, from: { sector: number; cell: number }, to: { sector: number; cell: number }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].npcs[index])) as INPC;
      this.data.sectors[to.sector].cells[to.cell].npcs.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].npcs.splice(index, 1);
    },
    moveCreature(index: number, from: { sector: number; cell: number }, to: { sector: number; cell: number }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].creatures[index])) as ICreature;
      this.data.sectors[to.sector].cells[to.cell].creatures.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].creatures.splice(index, 1);
    },
    moveDerelict(index: number, from: { sector: number; cell: number }, to: { sector: number; cell: number }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].derelicts[index])) as IDerelict;
      this.data.sectors[to.sector].cells[to.cell].derelicts.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].derelicts.splice(index, 1);
    },
    moveVault(index: number, from: { sector: number; cell: number }, to: { sector: number; cell: number }) {
      const o = JSON.parse(JSON.stringify(this.data.sectors[from.sector].cells[from.cell].vaults[index])) as IVault;
      this.data.sectors[to.sector].cells[to.cell].vaults.unshift(o);
      this.data.sectors[from.sector].cells[from.cell].vaults.splice(index, 1);
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
      config.data.index.push({ name: this.data?.name, id: this.data.id });

      const storeCopy = JSON.parse(JSON.stringify(this.data)) as ICampaign;
      await db.campaign.put(storeCopy).catch((err) => console.log(err));
    },

    async save() {
      const storeCopy = JSON.parse(JSON.stringify(this.data)) as ICampaign;
      await db.campaign.update(this.data.id, storeCopy).catch((err) => console.log(err));

      const config = useConfig();
      await config.updateIndex();
    },

    async load(id: string) {
      try {
        const campaign = await db.campaign.get(id);
        this.data = campaign as ICampaign;
      } catch (err) {
        console.log(err);
      }
    },

    async delete(id: string) {
      try {
        // Remove from database
        await db.campaign.delete(id);

        // Load first campaign or create a new one
        if ((await db.campaign.count()) > 0) {
          await db.campaign
            .toCollection()
            .first()
            .then(async (char) => {
              await this.load(char?.id as string);

              // Adjust index
              const config = useConfig();
              config.data.current = char?.id as string;
              await config.updateIndex();
            });
        } else {
          await this.new();
        }
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
