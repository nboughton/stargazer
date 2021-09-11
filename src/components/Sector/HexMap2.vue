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

    <q-dialog v-model="showDialog" full-width>
      <q-card class="my-card">
        <q-card-section class="row justify-between items-center custom-header text-h5">
          <span class="col">Cell Details</span>
          <q-btn class="col-shrink" icon="close" flat dense @click="showDialog = false" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { Polygon, Svg, SVG } from '@svgdotjs/svg.js';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { NewCell } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, onMounted, ref } from 'vue';
import { ECellStatus } from '../models';
export default defineComponent({
  // name: 'ComponentName'
  setup() {
    // Grab stores
    const campaign = useCampaign();
    const config = useConfig();
    const showDialog = ref(false);

    // Instantiate a null ref and set dimenions/id func
    const hexmap = ref(null);
    const dm = {
      height: 400,
      width: 800,
      hexSize: 20,
    };
    const h = (x: number, y: number): string => {
      return `h-${x}-${y}`;
    };
    const clearHexStatus = (p: Polygon) => Object.values(ECellStatus).forEach((s) => p.removeClass(s));

    // Define initial grid data
    const Hex = extendHex({ size: dm.hexSize });
    const Grid = defineGrid(Hex);
    const grid = Grid.rectangle({
      width: Math.floor(dm.width / (dm.hexSize * 2)) + 2,
      height: Math.floor(dm.height / (dm.hexSize * 2)) + 3,
    });
    const corners = Hex().corners();
    const points = corners.map((p) => `${p.x},${p.y}`).join(' ');

    // Make initial render
    let draw: Svg;
    const renderMap = () => {
      draw.clear();
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
    };

    onMounted(() => {
      draw = SVG()
        .addTo(hexmap.value as unknown as HTMLElement)
        .size('100%', '100%');

      renderMap();
    });

    // GET CLICKY WITH IT
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

      // If we've reached here then we probably want to open the dialog and do something with it
      // const c = campaign.data.sectors[config.data.sector].cells[id]
      showDialog.value = true;
    };

    return {
      hexmap,
      dm,
      click,
      showDialog,
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

svg polygon.empty {
  fill: white;
}

svg polygon.passage {
  fill: lightblue;
}

svg polygon.location {
  fill: green;
}

svg polygon.player {
  fill: blueviolet;
}
</style>
