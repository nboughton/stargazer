<template>
  <div class="row items-center no-wrap">
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
      label="Location"
      v-model="cellSelect"
      :options="cOpts"
      map-options
      emit-value
      borderless
      dense
    />
    <q-btn :icon="icon" flat dense @click="$emit('selected', { sector: sectorSelect, cell: cellSelect })" />
  </div>
</template>

<script lang="ts">
import { useCampaign } from 'src/store/campaign';
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

    const sectorSelect = ref(0);
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

    const cellSelect = ref(0);
    const cOpts = computed((): ISelectOpt[] => {
      let opts: ISelectOpt[] = [];
      Object.keys(campaign.data.sectors[sectorSelect.value].cells).forEach((c) => {
        if (campaign.data.sectors[sectorSelect.value].cells[c].stat === ECellStatus.Location) {
          opts.push({
            label: campaign.data.sectors[sectorSelect.value].cells[c].name,
            value: c,
          });
        }
      });
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
