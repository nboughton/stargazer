<template>
  <div class="row items-center">
    <q-input class="col-grow" :label="label" v-model="data" dense debounce="200">
      <template v-slot:append v-if="reroll">
        <span class="text-subtitle2"><q-icon name="mdi-autorenew" />1-{{ maxRerolls }}</span>
      </template>
    </q-input>
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
    reroll: {
      type: Boolean,
    },
    maxRerolls: {
      type: Number,
      default: 2,
    },
  },
  emits: ['update:modelValue', 'roll'],
  setup(props, { emit }) {
    const data = ref(props.modelValue || '');
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue as string)
    );
    watch(
      () => data.value,
      () => emit('update:modelValue', data.value)
    );

    return {
      data,
    };
  },
});
</script>
