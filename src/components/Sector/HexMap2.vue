<template>
  <q-layout view="hHh lpR fFf" container style="width: 800px; min-height: 400px">
    <q-page-container>
      <q-page>
        <div ref="hexmap" style="height: 400px; width: 800px"></div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { SVG } from '@svgdotjs/svg.js';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  // name: 'ComponentName'
  setup() {
    const hexmap = ref(null);

    onMounted(() => {
      const draw = SVG()
        .addTo(hexmap.value as unknown as HTMLElement)
        .size('100%', '100%');
      const Hex = extendHex({ size: 20 });
      const Grid = defineGrid(Hex);
      const corners = Hex().corners();
      Grid.rectangle({ width: 23, height: 11 }).forEach((hex) => {
        const { x, y } = hex.toPoint();
        draw
          .polygon(corners.map((p) => `${p.x},${p.y}`).join(' '))
          .addClass('hex')
          .translate(x, y);
      });
    });

    return {
      hexmap,
    };
  },
});
</script>

<style>
svg polygon.hex {
  fill: transparent;
  stroke: rgba(0, 255, 255, 0.25);
  stroke-width: 1pt;
}

svg polygon.hex:hover {
  stroke: rgba(0, 255, 255, 1);
}
</style>
