<template>
  <o-input label="Given Name" v-model="data.givenName" @roll="roll.Given" />
  <o-input label="Family Name" v-model="data.familyName" @roll="roll.Family" />
  <o-input label="Callsign" v-model="data.callsign" @roll="roll.Call" />
  <o-input label="First Look" v-model="data.firstLook" @roll="roll.First" />
  <o-input label="Disposition" v-model="data.disposition" @roll="roll.Disp" />
  <o-input label="Role" v-model="data.role" @roll="roll.Role" />
  <o-input label="Goal" v-model="data.goal" @roll="roll.Goal" />
  <o-input label="Revealed Aspect" v-model="data.aspect" @roll="roll.Aspect" />
</template>

<script lang="ts">
import { tableRoll } from 'src/lib/roll';
import { defineComponent, PropType, ref } from 'vue';
import { IChar } from '../models';
import { Character } from 'src/lib/oracles/character';
import OInput from './OInput.vue';
export default defineComponent({
  name: 'Character',
  components: { OInput },
  props: {
    modelValue: {
      type: Object as PropType<IChar>,
    },
  },
  setup(props) {
    const data = ref(props.modelValue || <IChar>{});

    const roll = {
      Given: () => {
        data.value.givenName = tableRoll(Character.givenName);
      },
      Family: () => {
        data.value.familyName = tableRoll(Character.familyName);
      },
      Call: () => {
        data.value.callsign = tableRoll(Character.callsign);
      },
      First: () => {
        data.value.firstLook = tableRoll(Character.firstLook);
      },
      Disp: () => {
        data.value.disposition = tableRoll(Character.disposition);
      },
      Role: () => {
        data.value.role = tableRoll(Character.role);
      },
      Goal: () => {
        data.value.goal = tableRoll(Character.goal);
      },
      Aspect: () => {
        data.value.aspect = tableRoll(Character.aspect);
      },
    };
    return {
      data,
      roll,
    };
  },
});
</script>
