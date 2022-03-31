<template>
  <div class="card-bg q-pa-xs">
    <o-input label="Story Complication" v-model="data.storyComplication" @roll="roll.storyComplication" />
    <o-input label="Story Clue" v-model="data.storyClue" @roll="roll.storyClue" />
    <o-input label="Anomaly Effect" v-model="data.anomalyEffect" @roll="roll.anomalyEffect" />
    <o-input label="Combat Action" v-model="data.combatAction" @roll="roll.combatAction" />
    <o-btns clear @clear="btns.Clear" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import * as oracle from 'src/lib/oracles';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  name: 'OMisc',
  components: { OInput, OBtns },
  setup() {
    const data = ref({
      anomalyEffect: '',
      combatAction: '',
      storyComplication: '',
      storyClue: '',
    });

    const roll = {
      storyComplication: () => (data.value.storyComplication = oracle.roll(['Misc', 'Story Complication'])),
      storyClue: () => (data.value.storyClue = oracle.roll(['Misc', 'Story Clue'])),
      anomalyEffect: () => (data.value.anomalyEffect = oracle.roll(['Misc', 'Anomaly Effect'])),
      combatAction: () => (data.value.combatAction = oracle.roll(['Misc', 'Combat Action'])),
    };

    const btns = {
      Clear: () => {
        data.value = {
          anomalyEffect: '',
          combatAction: '',
          storyComplication: '',
          storyClue: '',
        };
      },
    };
    return {
      data,
      roll,
      btns,
    };
  },
});
</script>
