<template>
  <div>
    <q-input label="Name" v-model="data.name" />
    <q-select
      label="Location"
      v-model="data.location"
      :options="Object.values(ESLocation)"
    />
    <q-input label="Population" v-model="data.population" />
    <q-input label="First Look" v-model="data.firstLook" />
    <q-input label="Initial Contact" v-model="data.initialContact" />
    <q-input label="Authority" v-model="data.authority" />
    <q-input label="Projects" v-model="data.projects" />
    <q-input label="Trouble" v-model="data.trouble" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ISettlement, ESLocation } from 'src/components/models';
export default defineComponent({
  name: 'Settlement',
  props: {
    modelValue: {
      type: Object as PropType<ISettlement>,
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
