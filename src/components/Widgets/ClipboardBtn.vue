<template>
  <q-btn icon="mdi-content-copy" flat dense @click="cp(data)">
    <q-tooltip>{{ $t('common.copyToClipboard') }}</q-tooltip>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

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
    const { t } = useI18n();
    const cp = (msg: string) =>
      copyToClipboard(msg).then(() =>
        $q.notify({
          message: t('common.copied'),
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
