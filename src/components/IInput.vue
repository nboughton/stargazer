<template>
  <q-input :label="label" v-model="data" :autogrow="autogrow" :clearable="clearable" dense standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" debounce="750">
    <template v-slot:append>
      <slot name="append" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: 'IInput',
  props: {
    modelValue: {
      type: String,
    },
    autogrow: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = ref(props.modelValue || '');
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue as string)
    );
    watch(
      () => data.value,
      () => ctx.emit('update:modelValue', data.value)
    );

    return {
      data,
    };
  },
});
</script>
