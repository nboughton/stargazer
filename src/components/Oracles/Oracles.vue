<template>
  <div class="content-start items-start">
    <oracle label="Core" :oracle="Core" />
    <space-sightings />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Core } from 'src/lib/oracles/core';

import SpaceSightings from 'src/components/Oracles/SpaceSightings.vue';
import Oracle from 'src/components/Oracles/Oracle.vue';

export default defineComponent({
  name: 'Oracles',
  components: { SpaceSightings, Oracle },
  setup() {
    return {
      Core,
    };
  },
});
</script>
