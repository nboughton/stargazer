<template>
  <!-- file deepcode ignore PureFunctionReturnValueIgnored: value passed to component -->
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select class="col-grow" label="Type" v-model="data.type" :options="Object.values(ELocTheme)" dense />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
    </div>

    <o-input label="Feature" v-model="data.feature" @roll="roll.Feat" />

    <o-input label="Peril" v-model="data.peril" @roll="roll.Peril" />

    <o-input label="Opportunity" v-model="data.opportunity" @roll="roll.Opp" />

    <o-btns clear @click="btns.Clear" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref } from 'vue';

import { ELocTheme } from '../models';

import * as oracle from 'src/lib/oracles';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'OLocationTheme',
  setup() {
    const data = ref({
      type: ELocTheme.Chaotic,
      feature: '',
      peril: '',
      opportunity: '',
    });

    const roll = {
      Type: () =>
        (data.value.type = oracle
          .roll('Starforged/Oracles/Location_Themes/Theme_Type')
          .replace(/[^a-z ]/gi, '') as ELocTheme),
      Feat: () => (data.value.feature = oracle.roll(`Starforged/Oracles/Location_Themes/${data.value.type}/Feature`)),
      Peril: () => (data.value.peril = oracle.roll(`Starforged/Oracles/Location_Themes/${data.value.type}/Peril`)),
      Opp: () =>
        (data.value.opportunity = oracle.roll(`Starforged/Oracles/Location_Themes/${data.value.type}/Opportunity`)),
    };

    const btns = {
      Clear: () => {
        data.value = {
          type: ELocTheme.Chaotic,
          feature: '',
          peril: '',
          opportunity: '',
        };
      },
    };

    return {
      ELocTheme,
      data,
      roll,
      btns,
    };
  },
});
</script>
