<template>
  <!--q-input label="Name" v-model="data.name" dense debounce="750" /-->

  <div class="row items-center">
    <q-select class="col-grow" label="Environment" v-model="data.environment" :options="Object.values(EEnv)" dense />
    <q-btn icon="mdi-dice-6" flat dense @click="roll.Env" />
  </div>

  <o-input label="Scale" v-model="data.scale" @roll="roll.Scale" />
  <o-input label="Basic Form" v-model="data.form" @roll="roll.Form" />
  <o-input label="First Look" v-model="data.firstLook" @roll="roll.First" reroll />
  <o-input label="Encountered Behaviour" v-model="data.behaviour" @roll="roll.Behave" />
  <o-input label="Revealed Aspect" v-model="data.aspect" @roll="roll.Aspect" reroll />

  <o-btns save @save="btns.Save" clear @clear="btns.Clear" initial @initial="btns.Initial" />
</template>

<script lang="ts">
import { Creature } from 'src/lib/oracles/creature';
import { tableRoll } from 'src/lib/roll';
import { defineComponent, PropType, ref } from 'vue';
import { ICreature, EEnv } from '../models';
import OBtns from './OBtns.vue';
import OInput from './OInput.vue';
export default defineComponent({
  components: { OInput, OBtns },
  name: 'OCreature',
  props: {
    modelValue: {
      type: Object as PropType<ICreature>,
    },
  },
  setup(props) {
    const data = ref(
      props.modelValue ||
        <ICreature>{
          environment: EEnv.Land,
        }
    );

    const roll = {
      Env: () => {
        data.value.environment = tableRoll(Creature.environment) as EEnv;
      },
      Scale: () => {
        let s = tableRoll(Creature.scale);
        if (s === 'Ultra-scale') {
          s = tableRoll(Creature.ultraScale);
        }
        data.value.scale = s;
      },
      Form: () => {
        data.value.form = tableRoll(Creature.form[data.value.environment]);
      },
      First: () => {
        const f = tableRoll(Creature.firstLook);
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Behave: () => {
        data.value.behaviour = tableRoll(Creature.behaviour);
      },
      Aspect: () => {
        const a = tableRoll(Creature.aspect);
        data.value.aspect ? (data.value.aspect += ', ' + a) : (data.value.aspect = a);
      },
    };

    const btns = {
      Clear: () => {
        data.value = <ICreature>{
          environment: EEnv.Land,
        };
      },
      Initial: () => {
        btns.Clear();
        roll.Env();
        roll.Scale();
        roll.Form();
        roll.First();
      },
      Save: () => {
        alert('Not yet implemented');
      },
    };
    return {
      data,
      EEnv,

      roll,
      btns,
    };
  },
});
</script>
