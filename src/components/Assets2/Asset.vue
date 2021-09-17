<template>
  <q-expansion-item :label="data.title" :caption="data.type" v-model="expanded"> Content goes here </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { IAsset } from '../models';
export default defineComponent({
  name: 'Asset',
  props: {
    modelValue: {
      type: Object as PropType<IAsset>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
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

    const expanded = ref(true);
    return {
      data,
      expanded,
    };
  },
});
</script>
