<template>
  <div class="content-start items-start">
    <space-sightings />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SpaceSightings from 'src/components/Oracles/SpaceSightings.vue';

export default defineComponent({
  name: 'Oracles',
  components: { SpaceSightings },
  setup() {
    return {};
  },
});
</script>
