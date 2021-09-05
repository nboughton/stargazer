<template>
  <div class="row items-center justify-evenly q-mt-md">
    <q-btn v-if="initial" icon="mdi-dice-multiple" flat @click="$emit('initial')" />
    <q-btn v-if="clear" icon="clear" flat @click="$emit('clear')" />
    <q-separator vertical v-if="save" />
    <div class="col q-ml-md" v-if="save">
      <div class="row items-center no-wrap">
        <q-select class="col-grow" label="Sector" v-model="sectorSelect" :options="sectorOpts" map-options emit-value borderless dense />
        <q-select class="col-grow" label="Location" v-model="cellSelect" :options="cellOpts" map-options emit-value borderless dense />
        <q-btn icon="save" flat dense @click="$emit('save', { sector: sectorSelect, cell: cellSelect })" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCampaign } from 'src/store/campaign';
import { defineComponent, computed, ref } from 'vue';
import { ISelectOpt } from '../models';
export default defineComponent({
  name: 'OBtns',
  props: {
    save: {
      type: Boolean,
    },
    clear: {
      type: Boolean,
    },
    initial: {
      type: Boolean,
    },
  },
  emits: ['save', 'clear', 'initial'],
  setup() {
    const campaign = useCampaign();

    const sectorSelect = ref(0);
    const sectorOpts = computed((): ISelectOpt[] => {
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
    const cellOpts = computed((): ISelectOpt[] => {
      let opts: ISelectOpt[] = [];
      campaign.data.sectors[sectorSelect.value].cells.forEach((c, ci) => {
        opts.push({
          label: c.name,
          value: ci,
        });
      });
      return opts;
    });

    return {
      sectorSelect,
      sectorOpts,

      cellSelect,
      cellOpts,
    };
  },
});
</script>
