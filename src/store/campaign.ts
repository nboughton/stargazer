import { defineStore } from 'pinia';
import { ICampaign } from 'components/models';
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
      const newCam = NewCampaign();
      this.data = newCam;

      const config = useConfig();
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
