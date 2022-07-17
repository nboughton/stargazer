<template>
  <q-btn icon="mdi-content-copy" flat dense @click="cp(data)">
    <q-tooltip>Copy to clipboard</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { copyToClipboard, useQuasar } from 'quasar';

export default defineComponent({
  name: 'ClipboardBtn',
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  setup() {
    const $q = useQuasar();
    const cp = (msg: string) =>
      copyToClipboard(msg).then(() =>
        $q.notify({
          message: 'Copied!',
          color: 'dark',
          position: 'top',
          icon: 'mdi-content-copy',
          timeout: 1000,
        })
      );
    return {
      cp,
    };
  },
});
</script>
