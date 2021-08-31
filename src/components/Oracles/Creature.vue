<template>
  <q-input label="Name" v-model="data.name" dense debounce="750" />

  <div class="row items-center">
    <q-select
      class="col-grow"
      label="Environment"
      v-model="data.environment"
      :options="Object.values(EEnv)"
      dense
    />
    <q-btn icon="mdi-dice-6" flat dense @click="roll.Env" />
  </div>

  <o-input label="Scale" v-model="data.scale" @roll="roll.Scale" />
  <o-input label="Basic Form" v-model="data.form" @roll="roll.Form" />
  <o-input label="First Look" v-model="data.firstLook" @roll="roll.First" />
  <o-input
    label="Encountered Behaviour"
    v-model="data.behaviour"
    @roll="roll.Behave"
  />
  <o-input label="Revealed Aspect" v-model="data.aspect" @roll="roll.Aspect" />
</template>

<script lang="ts">
import { Creature } from 'src/lib/oracles/creature';
import { tableRoll } from 'src/lib/roll';
import { defineComponent, PropType, ref } from 'vue';
import { ICreature, EEnv } from '../models';
import OInput from './OInput.vue';
export default defineComponent({
  components: { OInput },
  name: 'Creature',
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
        data.value.firstLook = tableRoll(Creature.firstLook);
      },
      Behave: () => {
        data.value.behaviour = tableRoll(Creature.behaviour);
      },
      Aspect: () => {
        data.value.aspect = tableRoll(Creature.aspect);
      },
    };

    return {
      data,
      EEnv,

      roll,
    };
  },
});
</script>
