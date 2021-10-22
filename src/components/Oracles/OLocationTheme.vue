<template>
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
import { tableRoll } from 'src/lib/roll';
import { defineComponent, ref } from 'vue';
import { ELocTheme } from '../models';
import { LocationTheme } from 'src/lib/oracles/locationTheme';
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
      Type: () => {
        data.value.type = tableRoll(LocationTheme.type) as ELocTheme;
      },
      Feat: () => {
        data.value.feature = tableRoll(LocationTheme[data.value.type].feature);
      },
      Peril: () => {
        data.value.peril = tableRoll(LocationTheme[data.value.type].peril);
      },
      Opp: () => {
        data.value.opportunity = tableRoll(LocationTheme[data.value.type].opportunity);
      },
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
