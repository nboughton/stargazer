<template>
  <div>
    <div class="row q-gutter-sm items-center">
      <span class="col-shrink">Move to</span>
      <location-select class="col-grow" icon="mdi-transfer-right" @selected="$emit('move', $event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LocationSelect from '../Widgets/LocationSelect.vue';

export default defineComponent({
  components: { LocationSelect },
  name: 'Controls',
  emits: ['move'],
});
</script>
