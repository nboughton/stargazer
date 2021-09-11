<template>
  <q-layout view="hHh lpR fFf" container :style="{ width: `${dm.width}px`, 'min-height': `${dm.height}px` }">
    <q-page-container>
      <q-page>
        <div
          class="hexmap"
          ref="hexmap"
          :style="{ width: `${dm.width}px`, height: `${dm.height}px` }"
          @click="click($event)"
        ></div>
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
    const dm = {
      height: 400,
      width: 800,
      hexSize: 20,
    };

    const Hex = extendHex({ size: dm.hexSize });
    const Grid = defineGrid(Hex);

    onMounted(() => {
      const draw = SVG()
        .addTo(hexmap.value as unknown as HTMLElement)
        .size('100%', '100%');

      const corners = Hex().corners();
      Grid.rectangle({ width: Math.floor(dm.width / dm.hexSize), height: Math.floor(dm.height / dm.hexSize) }).forEach(
        (hex) => {
          const { x, y } = hex.toPoint();
          draw
            .polygon(corners.map((p) => `${p.x},${p.y}`).join(' '))
            .addClass('hex')
            .translate(x, y);
        }
      );
    });

    const click = (ev: { offsetX: number; offsetY: number }) => {
      const hexCoordinates = Grid.pointToHex(ev.offsetX, ev.offsetY);
      alert(hexCoordinates);
    };
    return {
      hexmap,
      dm,
      click,
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
