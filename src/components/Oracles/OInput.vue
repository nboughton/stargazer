<template>
  <div class="row items-center">
    <clipboard-btn :data="data" />
    <q-input class="col-grow" :label="label" v-model="data" dense>
      <template v-slot:append v-if="reroll">
        <span class="text-subtitle2"><q-icon name="mdi-autorenew" />1-{{ maxRerolls }}</span>
      </template>
    </q-input>
    <q-btn v-if="!noRoll" icon="mdi-dice-6" flat dense @click="$emit('roll')">
      <q-tooltip>Roll oracle</q-tooltip>
    </q-btn>
    <q-btn v-if="custom" icon="edit" flat dense @click="$emit('edit')">
      <q-tooltip>Edit custom oracle</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import ClipboardBtn from 'src/components/Widgets/ClipboardBtn.vue';

export default defineComponent({
  name: 'OInput',
  components: { ClipboardBtn },
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
    noRoll: {
      type: Boolean,
    },
    custom: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'roll', 'edit'],
  setup(props, { emit }) {
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(value: string) {
        return emit('update:modelValue', value);
      },
    });

    return {
      data,
    };
  },
});
</script>
