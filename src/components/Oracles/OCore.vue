<template>
  <div class="card-bg q-pa-xs">
    <o-input label="Action" v-model="data.action" @roll="roll.Action" />
    <o-input label="Theme" v-model="data.theme" @roll="roll.Theme" />
    <o-input label="Descriptor" v-model="data.desc" @roll="roll.Desc" />
    <o-input label="Focus" v-model="data.focus" @roll="roll.Focus" />
    <o-btns clear @clear="btns.Clear" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import * as oracle from 'src/lib/oracles';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'OCore',
  setup() {
    const data = ref({
      action: '',
      theme: '',
      focus: '',
      desc: '',
    });

    const roll = {
      Action: () => {
        data.value.action = oracle.roll(['Core', 'Action']);
      },
      Theme: () => {
        data.value.theme = oracle.roll(['Core', 'Theme']);
      },
      Desc: () => {
        data.value.desc = oracle.roll(['Core', 'Descriptor']);
      },
      Focus: () => {
        data.value.focus = oracle.roll(['Core', 'Focus']);
      },
    };

    const btns = {
      Clear: () => {
        data.value = {
          action: '',
          theme: '',
          focus: '',
          desc: '',
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
