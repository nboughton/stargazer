<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select
        class="col-grow"
        :label="$t('common.type')"
        v-model="data.type"
        :options="themeOpts"
        map-options
        emit-value
        dense
      />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
    </div>

    <o-input :label="$t('oracles.fields.feature')" v-model="data.feature" @roll="roll.Feat" />

    <o-input :label="$t('oracles.fields.peril')" v-model="data.peril" @roll="roll.Peril" />

    <o-input :label="$t('oracles.fields.opportunity')" v-model="data.opportunity" @roll="roll.Opp" />

    <o-btns clear @click="btns.Clear" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed, defineComponent, ref } from 'vue';

import { ELocTheme } from '../models';

import * as oracle from 'src/lib/oracles';
import { enumOptions } from 'src/i18n';

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
    const themeOpts = computed(() => enumOptions(Object.values(ELocTheme), 'enums.locTheme'));

    const roll = {
      Type: () =>
        (data.value.type = oracle.rollLinkTail('Starforged/Oracles/Location_Themes/Theme_Type') as ELocTheme),
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
      themeOpts,
      data,
      roll,
      btns,
    };
  },
});
</script>
