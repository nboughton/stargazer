<template>
  <div>
    <div class="row justify-between">
      <div class="col text-h5 custom-header">{{ data.name }}</div>
    </div>

    <div class="row q-gutter-sm q-mb-sm no-wrap">
      <i-input class="col-grow" label="Name" v-model="data.name" />
      <q-select class="col-shrink" label="Type" v-model="data.location" :options="Object.values(ESLocation)" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense />
      <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
    </div>

    <div class="row q-gutter-sm q-mb-sm">
      <i-input class="col" label="Scale" v-model="data.scale" />
      <i-input class="col" label="Form" v-model="data.form" />
      <i-input class="col" label="Shape" v-model="data.shape" />
    </div>

    <i-input class="q-mb-sm" label="Notes" v-model="data.notes" />
    <q-separator />
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, ref, PropType, watch } from 'vue';
import IInput from '../IInput.vue';
import { IVault, ESLocation } from '../models';
export default defineComponent({
  components: { IInput },
  name: 'SVault',
  props: {
    modelValue: {
      type: Object as PropType<IVault>,
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
