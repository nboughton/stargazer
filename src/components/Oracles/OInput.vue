<template>
  <div class="row items-center">
    <q-input
      class="col-grow"
      :label="label"
      v-model="data"
      dense
      debounce="750"
    />
    <q-btn icon="mdi-dice-6" flat dense @click="$emit('roll')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: 'OInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue', 'roll'],
  setup(props) {
    const data = ref(props.modelValue || '');
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue as string)
    );

    return {
      data,
    };
  },
});
</script>
