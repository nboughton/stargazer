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
import { CellLabel } from 'src/lib/sector';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, computed, ref } from 'vue';
import { ECellStatus, ISelectOpt } from './models';
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
    const config = useConfig();

    const sectorSelect = ref(config.data.sector);
    const sOpts = computed((): ISelectOpt[] => {
      let opts: ISelectOpt[] = [];
      campaign.data.sectors.forEach((s, si) => {
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
      Object.keys(campaign.data.sectors[sectorSelect.value].cells).forEach((c) => {
        if (campaign.data.sectors[sectorSelect.value].cells[c].stat === ECellStatus.Location) {
          const { label } = CellLabel(campaign.data.sectors[sectorSelect.value].cells[c]);
          opts.push({
            label: label,
            value: c,
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
