<template>
  <q-layout view="hHh lpR fFf" container style="width: 820px; min-height: 400px">
    <q-page-container>
      <q-page>
        <div class="map">
          <div class="container">
            <div v-for="(o, i) in campaign.data.sectors[config.data.sector].hexes" :key="i">
              <hex-cell
                style="padding: 0; margin: 0"
                :cellData="campaign.data.sectors[config.data.sector].hexes[i]"
                @click="clickHex(o, i)"
              />
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section class="row my-card justify-between custom-header text-h5 items-center">
          <span class="col-shrink">Cell Details</span>
          <q-btn class="col-shrink" icon="close" flat dense @click="showDialog = false" />
        </q-card-section>

        <q-card-section>
          <cell class="q-mb-sm" v-if="selectedCell.found" :sectorID="config.data.sector" :cellID="selectedCell.cell" />

          <div class="row items-center q-gutter-sm">
            <span class="col-shrink">Link location:</span>
            <location-select icon="mdi-link" class="col" @selected="linkCell($event)" />
          </div>

          <div class="row items-center q-gutter-sm justify-evenly">
            <q-toggle
              class="col-shrink"
              label="Mark as passage"
              left-label
              v-model="campaign.data.sectors[config.data.sector].hexes[selectedHex].isPassage"
            />
            <q-toggle
              class="col-shrink"
              label="Set player location"
              left-label
              v-model="campaign.data.sectors[config.data.sector].hexes[selectedHex].player"
            />
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
import Cell from './Cell.vue';

export default defineComponent({
  components: { HexCell, LocationSelect, Cell },
  name: 'HexMap',
  setup() {
    const campaign = useCampaign();
    const config = useConfig();

    const showDialog = ref(false);
    const selectedHex = ref(0);
    const selectedCell = ref({ sector: 0, cell: 0, found: false });

    const clickHex = (o: IHex, i: number) => {
      selectedHex.value = i;
      selectedCell.value = { sector: 0, cell: 0, found: false };
      if (!o.isPassage && o.id === '') {
        campaign.data.sectors[config.data.sector].hexes[i].isPassage = true;
        return;
      }
      if (o.isPassage || o.id !== '') {
        if (o.id !== '') {
          selectedCell.value = campaign.getCellLocation(o.id);
        }
        showDialog.value = true;
      }
    };

    const linkCell = (args: { sector: number; cell: number }) => {
      // Unmark as passage
      campaign.data.sectors[config.data.sector].hexes[selectedHex.value].isPassage = false;

      // Get cell id
      const id = campaign.data.sectors[args.sector].cells[args.cell].id;

      // unlink cell from any other maps
      campaign.unlinkCell(id);
      selectedCell.value = campaign.getCellLocation(id);

      // Set cell id for item
      campaign.data.sectors[config.data.sector].hexes[selectedHex.value].id = id;
    };

    return {
      campaign,
      config,
      showDialog,
      selectedHex,
      selectedCell,
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
  background: black;
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
  shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 1px), #000 0 var(--f));
}
</style>
