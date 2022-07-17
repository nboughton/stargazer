<template>
  <div>
    <q-input
      class="q-my-sm"
      label="Search name or key word"
      v-model="filter"
      debounce="500"
      standout="bg-blue-grey text-white"
      :input-style="{ color: '#ECEFF4' }"
      dense
      clearable
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div v-for="(category, index) in starforged['Move Categories']" :key="index">
      <div v-for="(move, mIndex) in category.Moves" :key="mIndex">
        <div v-if="show(category.Name, move)" class="q-mb-sm">
          <move :move="move" :moveType="category.Name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { starforged } from 'dataforged';
import { IMove } from 'dataforged';
//import { Moves } from 'src/lib/moves';

import Move from 'src/components/Moves/Move.vue';

export default defineComponent({
  name: 'Moves',
  components: { Move },
  setup() {
    const filter = ref('');
    const show = (category: string, move: IMove): boolean => {
      if (filter.value === '' || filter.value === null) {
        return true;
      }

      if (RegExp(filter.value, 'i').test(category)) {
        return true;
      }

      if (move.Name !== undefined) {
        if (RegExp(filter.value, 'i').test(move.Name)) {
          return true;
        }
      }

      if (move.Tags !== undefined) {
        if (RegExp(filter.value, 'i').test(move.Tags.join(', '))) {
          return true;
        }
      }

      if (move.Text !== undefined) {
        if (RegExp(filter.value, 'i').test(move.Text)) {
          return true;
        }
      }

      if (move.Source !== undefined) {
        if (RegExp(filter.value, 'i').test(move.Source.Title)) {
          return true;
        }
      }
      return false;
    };

    return {
      starforged,
      filter,
      show,
    };
  },
});
</script>
