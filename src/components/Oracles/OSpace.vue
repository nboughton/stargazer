<template>
  <div class="card-bg q-pa-xs">
    <q-select label="Region" v-model="regionSelect" :options="Object.values(ERegion)" dense />

    <o-input label="Sighting" v-model="data.sighting" @roll="roll.Sight" />

    <o-input label="Sector Name" v-model="data.sectorName" @roll="roll.Name" />

    <o-input label="Stellar Object" v-model="data.obj" @roll="roll.Obj" />

    <o-input label="Peril" v-model="data.peril" @roll="roll.Peril" />

    <o-input label="Opportunity" v-model="data.opportunity" @roll="roll.Opp" />

    <o-btns clear @clear="btns.Clear" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { ERegion } from '../models';

import * as oracle from 'src/lib/oracles';

import OBtns from './OBtns.vue';
import OInput from './OInput.vue';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'OSpace',
  setup() {
    const data = ref({
      sighting: '',
      obj: '',
      sectorName: '',
      peril: '',
      opportunity: '',
    });

    const regionSelect = ref(ERegion.Terminus);

    const roll = {
      Sight: () => {
        data.value.sighting = oracle.roll(`Starforged/Oracles/Space/Sighting/${regionSelect.value}`);
      },
      Obj: () => {
        data.value.obj = oracle.roll('Starforged/Oracles/Space/Stellar_Object');
      },
      Name: () => {
        data.value.sectorName = `${oracle.roll('Starforged/Oracles/Space/Sector_Name/Prefix')} ${oracle.roll(
          'Starforged/Oracles/Space/Sector_Name/Suffix'
        )}`;
      },
      Peril: () => {
        data.value.peril = oracle.roll('Starforged/Oracles/Space/Peril');
      },
      Opp: () => {
        data.value.opportunity = oracle.roll('Starforged/Oracles/Space/Opportunity');
      },
    };

    const btns = {
      Clear: () => {
        data.value = {
          sighting: '',
          obj: '',
          sectorName: '',
          peril: '',
          opportunity: '',
        };
      },
    };

    return {
      data,
      regionSelect,
      ERegion,

      roll,
      btns,
    };
  },
});
</script>
