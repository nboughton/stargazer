<template>
  <div class="card-bg q-pa-xs">
    <div class="row justify-between q-ma-xs items-center">
      <div class="col-grow text-bold">Add Custom Oracle</div>
      <q-btn class="col-shrink" icon="add_circle" flat dense @click="$emit('new')" />
    </div>
    <o-input
      v-for="(o, i) of sortedOracleData"
      :key="i"
      :label="o.Name"
      v-model="results[i]"
      custom
      @edit="$emit('edit', o.$id)"
      @roll="roll(o.$id, i)"
    />
    <o-btns clear @clear="clear" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue';

import { useOracles } from 'src/store/oracles';

import { rollCustom } from 'src/lib/oracles';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  name: 'OCustom',
  emits: ['edit', 'new'],
  setup() {
    const oracles = useOracles();
    const results: Ref<string[]> = ref(new Array(oracles.data.length).fill('') as string[]);
    const roll = (id: string, index: number) => (results.value[index] = rollCustom(id));
    const clear = () => results.value.forEach((r, i) => (results.value[i] = ''));
    const sortedOracleData = computed(() => {
      return [...oracles.data].sort((a, b) => a.Name.localeCompare(b.Name));
    });

    return {
      sortedOracleData,
      results,
      roll,
      clear,
    };
  },
  components: { OInput, OBtns },
});
</script>
