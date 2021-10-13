<template>
  <div class="row items-center">
    <q-input class="col-grow" :label="label" v-model="data" dense>
      <template v-slot:append v-if="reroll">
        <span class="text-subtitle2"><q-icon name="mdi-autorenew" />1-{{ maxRerolls }}</span>
      </template>
    </q-input>
    <q-btn icon="mdi-dice-6" flat dense @click="$emit('roll')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
  name: 'OInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
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
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(value: string) {
        emit('update:modelValue', value);
      },
    });

    return {
      data,
    };
  },
});
</script>
