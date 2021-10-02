<template>
  <div class="row items-center justify-evenly q-mt-md">
    <q-btn v-if="initial" icon="mdi-dice-multiple" flat @click="$emit('initial')">
      <q-tooltip>Roll first look</q-tooltip>
    </q-btn>

    <q-btn v-if="clear" icon="clear" flat @click="$emit('clear')">
      <q-tooltip>Clear results</q-tooltip>
    </q-btn>

    <q-separator vertical v-if="save" />
    <div class="col q-ml-md" v-if="save">
      <location-select @selected="$emit('save', $event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LocationSelect from '../LocationSelect.vue';

export default defineComponent({
  components: { LocationSelect },
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
