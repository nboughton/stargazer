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
import { Svg, SVG } from '@svgdotjs/svg.js';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { NewCell } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, onMounted, ref } from 'vue';
import { ECellStatus } from '../models';
export default defineComponent({
  // name: 'ComponentName'
  setup() {
    const campaign = useCampaign();
    const config = useConfig();

    const hexmap = ref(null);
    const dm = {
      height: 400,
      width: 800,
      hexSize: 20,
    };
    const h = (x: number, y: number): string => {
      return `h-${x}-${y}`;
    };

    const Hex = extendHex({ size: dm.hexSize });
    const Grid = defineGrid(Hex);

    const grid = Grid.rectangle({
      width: Math.floor(dm.width / (dm.hexSize * 2)) + 2,
      height: Math.floor(dm.height / (dm.hexSize * 2)) + 3,
    });
    const corners = Hex().corners();
    const points = corners.map((p) => `${p.x},${p.y}`).join(' ');

    let draw: Svg;

    onMounted(() => {
      draw = SVG()
        .addTo(hexmap.value as unknown as HTMLElement)
        .size('100%', '100%');

      grid.forEach((hex) => {
        const { x, y } = hex.toPoint();
        const id = h(hex.x, hex.y);
        const poly = draw.polygon(points).addClass('hex').addClass(id);

        // Initial draw for existing locations
        if (campaign.data.sectors[config.data.sector].cells[id]) {
          const c = campaign.data.sectors[config.data.sector].cells[id];
          poly.addClass(c.stat);
        }

        poly.translate(x, y);
      });
    });

    const click = (ev: { offsetX: number; offsetY: number }) => {
      // Get the SVG hex that was clicked on
      const hex = grid.get(Grid.pointToHex(ev.offsetX, ev.offsetY));

      // Derive its ID and get the actual object
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const id = h(hex!.x, hex!.y);
      const poly = draw.findOne('.' + id);

      // If no data exists for the cell then create it initially and make it a passage
      if (!campaign.data.sectors[config.data.sector].cells[id]) {
        campaign.data.sectors[config.data.sector].cells[id] = NewCell(id);
        campaign.data.sectors[config.data.sector].cells[id].stat = ECellStatus.Passage;
        poly.addClass(ECellStatus.Passage);
        return;
      }
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
  fill: white;
  stroke: black;
  stroke-width: 1pt;
}

svg polygon.hex:hover {
  fill: lightgray;
}

svg polygon.passage {
  fill: lightblue;
}

svg polygon.loc {
  fill: green;
}
</style>
