<template>
  <div class="row items-center justify-evenly q-mt-md">
    <q-btn v-if="initial" label="initial" outline @click="$emit('initial')" />
    <q-btn v-if="save" label="save" outline @click="$emit('save')" />
    <q-btn v-if="clear" label="clear" outline @click="$emit('clear')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'OBtns',
  props: {
    save: {
      type: Boolean,
    },
    clear: {
      type: Boolean,
    },
    initial: {
      type: Boolean,
    },
  },
  emits: ['save', 'clear', 'initial'],
});
</script>
