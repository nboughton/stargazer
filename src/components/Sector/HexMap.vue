<template>
  <q-layout view="hHh lpR fFf" container style="width: 820px; min-height: 400px">
    <q-page-container>
      <q-page>
        <div class="map">
          <div class="container">
            <hex-cell v-for="(o, i) in campaign.data.sectors[config.data.sector].hexes" :key="i" :cellData="o" @click="clickHex(o, i)" />
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section class="row my-card justify-between items-center text-h5 custom-header">
          <div class="col-shrink">Edit Cell</div>
          <q-btn class="col-shrink" icon="close" flat dense @click="showDialog = false" />
        </q-card-section>

        <q-card-section>
          <div class="row items-center q-gutter-sm">
            <span class="col-shrink text-h6">Set Location</span>
            <location-select class="col" @selected="linkCell($event)" />
          </div>

          <div class="row items-center q-gutter-sm">
            <span class="col-shrink">Mark as </span>
            <q-toggle class="col-shrink" label="Passage" v-model="campaign.data.sectors[config.data.sector].hexes[selectedHex].isPassage" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, ref } from 'vue';
import { IHex } from '../models';
import HexCell from './HexCell.vue';
import LocationSelect from 'src/components/LocationSelect.vue';

export default defineComponent({
  components: { HexCell, LocationSelect },
  name: 'HexMap',
  setup() {
    const campaign = useCampaign();
    const config = useConfig();

    const showDialog = ref(false);
    const selectedHex = ref(0);
    const clickHex = (o: IHex, i: number) => {
      selectedHex.value = i;
      if (!o.isPassage && o.id === '') {
        campaign.data.sectors[config.data.sector].hexes[i].isPassage = true;
        return;
      }
      if (o.isPassage || o.id !== '') {
        showDialog.value = true;
      }
    };

    const unlinkCell = (id: string) => {
      campaign.data.sectors.forEach((s, sI) => {
        s.hexes.forEach((h, hI) => {
          if (h.id === id) {
            campaign.data.sectors[sI].hexes[hI].id = '';
            return;
          }
        });
      });
    };

    const linkCell = (args: { sector: number; cell: number }) => {
      // Unmark as passage
      campaign.data.sectors[config.data.sector].hexes[selectedHex.value].isPassage = false;

      // Get cell id
      const id = campaign.data.sectors[args.sector].cells[args.cell].id;

      // unlink cell from any other maps
      unlinkCell(id);

      // Set cell id for item
      campaign.data.sectors[config.data.sector].hexes[selectedHex.value].id = id;
    };

    return {
      campaign,
      config,
      showDialog,
      selectedHex,
      clickHex,
      linkCell,
    };
  },
});
</script>

<style lang="css">
.map {
  width: 800px;
  height: 330px;
  display: flex;
  --s: 30px; /* size  */
  --m: 1px; /* margin */
  --f: calc(1.732 * var(--s) + 4 * var(--m) - 1px);
}

.container {
  font-size: 0; /*disable white space between inline block element */
}

.container div {
  width: var(--s);
  margin: var(--m);
  height: calc(var(--s) * 1.1547);
  display: inline-block;
  font-size: initial;
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
  background: white;
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);
}
/*.container div:nth-child(odd) {
  background: green;
}*/
.container div:hover {
  background: grey;
}
.container::before {
  content: '';
  width: calc(var(--s) / 2 + var(--m));
  float: left;
  height: 120%;
  shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 3px), #000 0 var(--f));
}
</style>
