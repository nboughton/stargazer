<template>
  <q-select
    label="Region"
    v-model="regionSelect"
    :options="Object.values(ERegion)"
    dense
  />

  <o-input label="Sighting" v-model="data.sighting" @roll="roll.Sight" />

  <o-input label="Sector Name" v-model="data.sectorName" @roll="roll.Name" />

  <o-input label="Stellar Object" v-model="data.obj" @roll="roll.Obj" />

  <o-input label="Peril" v-model="data.peril" @roll="roll.Peril" />

  <o-input label="Opportunity" v-model="data.opportunity" @roll="roll.Opp" />

  <o-btns clear @clear="btns.Clear" />
</template>

<script lang="ts">
import { Space } from 'src/lib/oracles/space';
import { tableRoll } from 'src/lib/roll';
import { defineComponent, ref } from 'vue';
import { ERegion } from '../models';
import OBtns from './OBtns.vue';
import OInput from './OInput.vue';
export default defineComponent({
  components: { OInput, OBtns },
  name: 'Space',
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
        data.value.sighting = tableRoll(Space.sighting[regionSelect.value]);
      },
      Obj: () => {
        data.value.obj = tableRoll(Space.stellarObject);
      },
      Name: () => {
        data.value.sectorName = `${tableRoll(Space.sectorPrefix)} ${tableRoll(
          Space.sectorSuffix
        )}`;
      },
      Peril: () => {
        data.value.peril = tableRoll(Space.peril);
      },
      Opp: () => {
        data.value.opportunity = tableRoll(Space.opportunity);
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
