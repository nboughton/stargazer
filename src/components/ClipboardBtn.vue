<template>
  <q-btn icon="mdi-content-copy" flat dense @click="copyToClipboard(data)">
    <q-tooltip>Copy to clipboard</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { copyToClipboard } from 'quasar';
export default defineComponent({
  name: 'ClipboardBtn',
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      copyToClipboard,
    };
  },
});
</script>
