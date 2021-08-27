<template>
  <div>
    <q-input label="Name" v-model="data.name" />
    <q-select
      label="Location"
      v-model="data.location"
      :options="Object.values(ESLocation)"
    />
    <q-select
      label="Type"
      v-model="data.type"
      :options="Object.values(EDerelictType)"
    />
    <q-input label="Condition" v-model="data.condition" />
    <q-input label="Outer First Look" v-model="data.outerFirstLook" />
    <q-input label="Inner First Look" v-model="data.innerFirstLook" />
    <q-select
      label="Current Zone"
      v-model="data.currentZone"
      :options="Object.values(EDerelictZone)"
    />
    <q-input label="Exploration" v-model="data.explore" autogrow />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { IDerelict, ESLocation, EDerelictType, EDerelictZone } from '../models';
export default defineComponent({
  name: 'Derelict',
  props: {
    modelValue: {
      type: Object as PropType<IDerelict>,
      required: true,
    },
  },
  setup(props) {
    const data = ref(props.modelValue);

    return {
      data,
      ESLocation,
      EDerelictType,
      EDerelictZone,
    };
  },
});
</script>
