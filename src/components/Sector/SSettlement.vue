<template>
  <div>
    <div class="row justify-between">
      <div class="col text-h4 custom-header">{{ data.name }}</div>
    </div>

    <div class="row q-gutter-sm q-mb-sm no-wrap">
      <i-input class="col-grow" label="Name" v-model="data.name" />
      <q-select label="Type" v-model="data.location" :options="Object.values(ESLocation)" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense />
      <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
    </div>

    <div class="row q-gutter-sm justify-between q-mb-sm">
      <i-input class="col" label="Authority" v-model="data.authority" />
      <i-input class="col" label="Population" v-model="data.population" />
      <i-input class="col" label="Projects" v-model="data.projects" />
    </div>

    <div class="row q-gutter-sm justify-between q-mb-sm">
      <i-input class="col" label="First Look" v-model="data.firstLook" />
      <i-input class="col" label="Initial Contact" v-model="data.initialContact" />
    </div>

    <i-input class="q-mb-sm" label="Trouble" v-model="data.trouble" />
    <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    <q-separator />
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch } from 'vue';
import IInput from '../IInput.vue';
import { ISettlement, ESLocation } from '../models';
export default defineComponent({
  components: { IInput },
  name: 'SSettlement',
  props: {
    modelValue: {
      type: Object as PropType<ISettlement>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'delete'],
  setup(props, { emit }) {
    const data = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );
    watch(
      () => data.value,
      () => emit('update:modelValue', data.value),
      { deep: true }
    );

    const config = useConfig();

    return {
      data,
      config,
      ESLocation,
    };
  },
});
</script>
