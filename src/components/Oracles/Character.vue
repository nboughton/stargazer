<template>
  <o-input label="Name" v-model="data.name" @roll="roll.Name" />
  <o-input label="Callsign" v-model="data.callsign" @roll="roll.Call" />
  <o-input
    label="First Look"
    v-model="data.firstLook"
    @roll="roll.First"
    reroll
  />
  <o-input label="Disposition" v-model="data.disposition" @roll="roll.Disp" />
  <o-input label="Role" v-model="data.role" @roll="roll.Role" />
  <o-input label="Goal" v-model="data.goal" @roll="roll.Goal" />
  <o-input
    label="Revealed Aspect"
    v-model="data.aspect"
    @roll="roll.Aspect"
    reroll
    :maxRerolls="3"
  />
  <o-btns
    save
    @save="btns.Save"
    clear
    @clear="btns.Clear"
    initial
    @initial="btns.Initial"
  />
</template>

<script lang="ts">
import { tableRoll } from 'src/lib/roll';
import { defineComponent, PropType, ref } from 'vue';
import { IChar } from '../models';
import { Character } from 'src/lib/oracles/character';
import OInput from './OInput.vue';
import OBtns from './OBtns.vue';
export default defineComponent({
  name: 'Character',
  components: { OInput, OBtns },
  props: {
    modelValue: {
      type: Object as PropType<IChar>,
    },
  },
  setup(props) {
    const data = ref(props.modelValue || <IChar>{});

    const roll = {
      Name: () => {
        data.value.name = `${tableRoll(Character.givenName)} ${tableRoll(
          Character.familyName
        )}`;
      },
      Call: () => {
        data.value.callsign = tableRoll(Character.callsign);
      },
      First: () => {
        const f = tableRoll(Character.firstLook);
        data.value.firstLook
          ? (data.value.firstLook += ', ' + f)
          : (data.value.firstLook = f);
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
        const a = tableRoll(Character.aspect);
        data.value.aspect
          ? (data.value.aspect += ', ' + a)
          : (data.value.aspect = a);
      },
    };

    const btns = {
      Clear: () => {
        data.value = <IChar>{};
      },
      Initial: () => {
        btns.Clear();
        roll.Name();
        roll.Call();
        roll.First();
        roll.Disp();
      },
      Save: () => {
        alert('Not yet implemented');
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
