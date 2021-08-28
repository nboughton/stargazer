<template>
  <div>
    <q-input label="Name" v-model="data.name" />
    <q-select
      label="Location"
      v-model="data.location"
      :options="Object.values(ESLocation)"
    />
    <q-input label="Scale" v-model="data.scale" />
    <q-input label="Form" v-model="data.form" />
    <q-input label="Shape" v-model="data.shape" />
    <q-input label="Material" v-model="data.material" />
    <q-input label="Outer First Look" v-model="data.outerFirstLook" />
    <q-input label="Inner First Look" v-model="data.innerFirstLook" />

    <q-expansion-item label="Interior">
      <q-input label="Feature" v-model="data.interior.feature" />
      <q-input label="Peril" v-model="data.interior.peril" />
      <q-input label="Opportunity" v-model="data.interior.opportunity" />
    </q-expansion-item>

    <q-expansion-item label="Sanctum">
      <q-input label="Feature" v-model="data.sanctum.feature" />
      <q-input label="Peril" v-model="data.sanctum.peril" />
      <q-input label="Opportunity" v-model="data.sanctum.opportunity" />
      <q-input label="Purpose" v-model="data.purpose" />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { IVault, ESLocation } from '../models';
export default defineComponent({
  name: 'Vault',
  props: {
    modelValue: {
      type: Object as PropType<IVault>,
      required: true,
    },
  },
  setup(props) {
    const data = ref(props.modelValue);

    return {
      data,
      ESLocation,
    };
  },
});
</script>
