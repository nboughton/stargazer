<template>
  <div>
    <q-input label="Name" v-model="data.name" />
    <q-select
      label="Environment"
      v-model="data.environment"
      :options="Object.values(EEnv)"
    />
    <q-input label="Scale" v-model="data.scale" />
    <q-input label="Basic Form" v-model="data.form" />
    <q-input label="First Look" v-model="data.firstLook" />
    <q-input label="Encountered Behaviour" v-model="data.behaviour" />
    <q-input label="Revealed Aspect" v-model="data.aspect" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ICreature, EEnv } from '../models';
export default defineComponent({
  name: 'Creature',
  props: {
    modelValue: {
      type: Object as PropType<ICreature>,
      required: true,
    },
  },
  setup(props) {
    const data = ref(props.modelValue);

    return {
      data,
      EEnv,
    };
  },
});
</script>
