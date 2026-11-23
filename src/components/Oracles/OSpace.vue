<template>
  <div class="card-bg q-pa-xs">
    <q-select
      :label="$t('common.region')"
      v-model="regionSelect"
      :options="regionOpts"
      map-options
      emit-value
      dense
    />

    <o-input :label="$t('oracles.fields.sighting')" v-model="data.sighting" @roll="roll.Sight" />

    <o-input :label="$t('oracles.fields.sectorName')" v-model="data.sectorName" @roll="roll.Name" />

    <o-input :label="$t('oracles.fields.stellarObject')" v-model="data.obj" @roll="roll.Obj" />

    <o-input :label="$t('oracles.fields.peril')" v-model="data.peril" @roll="roll.Peril" />

    <o-input :label="$t('oracles.fields.opportunity')" v-model="data.opportunity" @roll="roll.Opp" />

    <o-btns clear @clear="btns.Clear" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { ERegion } from '../models';

import * as oracle from 'src/lib/oracles';
import { enumOptions } from 'src/i18n';

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
    const regionOpts = computed(() => enumOptions(Object.values(ERegion), 'enums.region'));

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
      regionOpts,
      ERegion,

      roll,
      btns,
    };
  },
});
</script>
