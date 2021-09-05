<template>
  <o-input label="Action" v-model="data.action" @roll="roll.Action" />
  <o-input label="Theme" v-model="data.theme" @roll="roll.Theme" />
  <o-input label="Descriptor" v-model="data.desc" @roll="roll.Desc" />
  <o-input label="Focus" v-model="data.focus" @roll="roll.Focus" />
  <o-btns clear @clear="btns.Clear" />
</template>

<script lang="ts">
import { tableRoll } from 'src/lib/roll';
import { Core } from 'src/lib/oracles/core';
import { defineComponent, ref } from 'vue';
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
        data.value.action = tableRoll(Core.action);
      },
      Theme: () => {
        data.value.theme = tableRoll(Core.theme);
      },
      Desc: () => {
        data.value.desc = tableRoll(Core.descriptor);
      },
      Focus: () => {
        data.value.focus = tableRoll(Core.focus);
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
