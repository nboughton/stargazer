<template>
  <div>
    <q-input
      class="q-my-sm"
      :label="$t('moves.searchPlaceholder')"
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
    <div v-for="(category, index) in activeStarforged['Move Categories']" :key="category.$id || index">
      <div v-for="(move, mIndex) in category.Moves" :key="move.$id || mIndex">
        <div v-if="show(category.Name, move)" class="q-mb-sm">
          <move :move="move" :moveType="category.Name" :categoryId="category.$id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { IMove } from 'dataforged';
import { currentStarforged } from 'src/lib/dataforged';

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

      const query = filter.value.toLowerCase();

      if (category.toLowerCase().includes(query)) {
        return true;
      }

      if (move.Name !== undefined && move.Name.toLowerCase().includes(query)) {
        return true;
      }

      if (move.Tags !== undefined && move.Tags.join(', ').toLowerCase().includes(query)) {
        return true;
      }

      if (move.Text !== undefined && move.Text.toLowerCase().includes(query)) {
        return true;
      }

      if (move.Source !== undefined && move.Source.Title.toLowerCase().includes(query)) {
        return true;
      }

      return false;
    };

    return {
      activeStarforged: currentStarforged,
      filter,
      show,
    };
  },
});
</script>
