<template>
  <div class="row items-center">
    <div class="col">
      <div class="row">
        <q-select
          class="col-grow"
          label="Sector"
          v-model="sectorSelect"
          :options="sOpts"
          map-options
          emit-value
          borderless
          dense
        />
        <q-select
          class="col-grow"
          label="Cell"
          v-model="cellSelect"
          :options="cOpts"
          map-options
          emit-value
          borderless
          dense
        />
      </div>
    </div>
    <q-btn :icon="icon" flat dense @click="$emit('selected', { sector: sectorSelect, cell: cellSelect })" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import { ECellStatus, ISelectOpt } from '../models';
import { useCampaign } from 'src/store/campaign';
import { CellLabel } from 'src/lib/sector';

export default defineComponent({
  name: 'LocationSelect',
  props: {
    icon: {
      type: String,
      default: 'save',
    },
  },
  emits: ['selected'],
  setup() {
    const campaign = useCampaign();

    const sectorSelect = ref(campaign.config.sector);
    const sOpts = computed((): ISelectOpt[] => {
      let opts: ISelectOpt[] = [];
      campaign.data[campaign.camId].sectors.forEach((s, si) => {
        opts.push({
          label: s.name,
          value: si,
        });
      });
      return opts;
    });

    const cellSelect = ref(null);
    const cOpts = computed((): ISelectOpt[] => {
      let opts: ISelectOpt[] = [];
      Object.keys(campaign.data[campaign.camId].sectors[sectorSelect.value].cells).forEach((id) => {
        if (campaign.data[campaign.camId].sectors[sectorSelect.value].cells[id].stat === ECellStatus.Location) {
          const { label } = CellLabel(campaign.data[campaign.camId].sectors[sectorSelect.value].cells[id], id);
          opts.push({
            label: label,
            value: id,
          });
        }
      });
      if (opts.length == 0) {
        opts.push({
          label: 'Create a location to save data',
          value: '__no-data__',
        });
      }
      return opts;
    });

    return {
      sectorSelect,
      sOpts,

      cellSelect,
      cOpts,
    };
  },
});
</script>
