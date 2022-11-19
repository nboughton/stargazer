<template>
  <q-page padding>
    <!-- content -->
    <journal />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Journal from 'src/components/Journal/Journal.vue';

export default defineComponent({
  // name: 'PageName'
  components: { Journal },
});
</script>
