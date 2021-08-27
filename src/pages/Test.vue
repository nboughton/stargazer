<template>
  <q-page padding>
    <!-- content -->
    <space-sightings-oracle class="row full-width" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SpaceSightingsOracle from 'src/components/Oracles/SpaceSightings.vue';
export default defineComponent({
  name: 'PageTest',
  components: { SpaceSightingsOracle },
});
</script>
