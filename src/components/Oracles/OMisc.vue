<template>
  <o-input label="Anomaly Effect" v-model="data.anomalyEffect" @roll="roll.anomalyEffect" />
  <o-input label="Combat Action" v-model="data.combatAction" @roll="roll.combatAction" />
  <o-input label="Story Complication" v-model="data.storyComplication" @roll="roll.storyComplication" />
  <o-btns clear @clear="btns.Clear" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import OInput from './OInput.vue';
import OBtns from './OBtns.vue';
import { tableRoll } from 'src/lib/roll';
import { Misc } from 'src/lib/oracles/misc';
export default defineComponent({
  name: 'OMisc',
  components: { OInput, OBtns },
  setup() {
    const data = ref({
      anomalyEffect: '',
      combatAction: '',
      storyComplication: '',
    });

    const roll = {
      anomalyEffect: () => (data.value.anomalyEffect = tableRoll(Misc.anomalyEffect)),
      combatAction: () => (data.value.combatAction = tableRoll(Misc.combatAction)),
      storyComplication: () => (data.value.storyComplication = tableRoll(Misc.storyComplication)),
    };

    const btns = {
      Clear: () => {
        data.value = {
          anomalyEffect: '',
          combatAction: '',
          storyComplication: '',
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
