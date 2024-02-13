<template>
  <q-input
    type="number"
    :min="0"
    :max="4"
    v-model="data"
    :label="label"
    @update:modelValue="updateValue"
    standout="bg-blue-grey text-white"
    :input-style="{ color: '#ECEFF4', fontSize: '2em' }"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'Stats',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = ref(+props.modelValue);
    watch(
      () => props.modelValue,
      () => (data.value = +props.modelValue)
    );

    const updateValue = () => ctx.emit('update:modelValue', data.value);

    return {
      updateValue,
      data,
    };
  },
});
</script>
