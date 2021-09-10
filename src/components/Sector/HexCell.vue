<template>
  <div class="hex-cell" :style="{ background: colour }" @mouseover="hover = true" @mouseleave="hover = false">
    <q-btn icon="" flat dense />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
import { IHex } from '../models';
export default defineComponent({
  name: 'HexCell',
  props: {
    cellData: {
      type: Object as PropType<IHex>,
      required: true,
    },
  },
  setup(props) {
    const hover = ref(false);
    const colour = computed((): string => {
      if (hover.value) return 'lightgrey';
      if (props.cellData.id !== '') return 'black';
      return props.cellData.isPassage ? 'lightblue' : 'white';
    });

    return {
      hover,
      colour,
    };
  },
});
</script>
