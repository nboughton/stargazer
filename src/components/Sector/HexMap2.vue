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

    <q-dialog v-model="showDialog">
      <q-card class="my-card">
        <q-card-section class="row justify-between items-center custom-header bg-secondary text-h5">
          <span class="col">Cell Details</span>
          <q-btn class="col-shrink" icon="close" flat dense @click="showDialog = false" />
        </q-card-section>

        <q-card-section>
          <q-select
            label="Set cell status"
            hint="Set to 'location' to save Oracle generated content and enable search for this cell"
            v-model="campaign.data.sectors[config.data.sector].cells[selectedID].stat"
            :options="Object.values(ECellStatus)"
          />
        </q-card-section>

        <q-card-section>
          <cell :sectorID="config.data.sector" :cellID="selectedID" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { Gradient, Svg, SVG } from '@svgdotjs/svg.js';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { NewCell } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { icon } from 'src/lib/icons';
import { ECellStatus, ISectorCell } from '../models';
import Cell from './Cell.vue';
export default defineComponent({
  components: { Cell },
  // name: 'ComponentName'
  setup() {
    // Grab stores
    const campaign = useCampaign();
    const config = useConfig();
    const showDialog = ref(false);
    const selectedID = ref('');

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

    // Define initial grid data
    const Hex = extendHex({ size: dm.hexSize });
    const Grid = defineGrid(Hex);
    const grid = Grid.rectangle({
      width: Math.floor(dm.width / (dm.hexSize * 2)) + 2,
      height: Math.floor(dm.height / (dm.hexSize * 2)) + 3,
    });
    const corners = Hex().corners();
    const points = corners.map((p) => `${p.x},${p.y}`).join(' ');

    let map: Svg;
    // All map magic happens here
    const locationFill = (c: ISectorCell): Gradient => {
      const f = map.gradient('radial', function (add) {
        let count = 0;
        const addFn = (colour: string) => {
          add.stop(count, colour);
          count++;
        };
        if (c.stars.length > 0) addFn('#6d72a4ff');
        if (c.planets.length > 0) addFn('#7368b0ff');
        if (c.settlements.length > 0) addFn('#9d5a9fff');
        if (c.ships.length > 0) addFn('#ad6398ff');
        if (c.derelicts.length > 0) addFn('#427a99ff');
        if (c.vaults.length > 0) addFn('#427074ff');
        if (c.creatures.length > 0) addFn('#3c8ab5ff');
        if (c.npcs.length > 0) add.stop(count, '#9e708fff');
      });
      return f;
    };

    const locationIcon = (c: ISectorCell, x: number, y: number) => {
      let path = '';
      if (c.npcs.length > 0) path = icon.npc();
      if (c.creatures.length > 0) path = icon.creature(c.creatures[0].form);
      if (c.vaults.length > 0) path = icon.vault();
      if (c.derelicts.length > 0) path = icon.derelict();
      if (c.ships.length > 0) path = icon.starship();
      if (c.settlements.length > 0) path = icon.settlement();
      if (c.planets.length > 0) path = icon.planet(c.planets[0].type);
      if (c.stars.length > 0) path = icon.stars();

      const i = SVG()
        .image(path.replace('img:', ''))
        .addClass('icon')
        .size(dm.hexSize, dm.hexSize)
        .addTo(map)
        .move(x + (dm.hexSize / 2) * 0.7, y + dm.hexSize / 2);

      i.mouseenter(() => {
        i.animate(100).transform({ scale: 1.3 });
      });

      i.mouseleave(() => {
        i.animate(100).transform({ scale: 1 });
      });
    };

    const renderMap = () => {
      map.clear();
      grid.forEach((hex) => {
        const { x, y } = hex.toPoint();
        const id = h(hex.x, hex.y);
        const cell = map.polygon(points).addClass('hex').addClass(id);
        cell.translate(x, y);

        // Render location data
        if (campaign.data.sectors[config.data.sector].cells[id]) {
          const c = campaign.data.sectors[config.data.sector].cells[id];
          cell.addClass(c.stat);
          switch (c.stat) {
            case ECellStatus.Location:
              cell.fill(locationFill(c));
              locationIcon(c, x, y);
              break;

            case ECellStatus.Passage:
              cell.fill('lightblue');
              break;

            default:
              cell.fill('white');
              break;
          }
        } else {
          cell.fill('white');
        }
      });
    };

    onMounted(() => {
      map = SVG()
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

      // If no data exists for the cell then create it initially and make it a passage
      // Note that all changes to cell data should happen in the renderMap function as
      // the map will re-render whenever the underlying cell data changes.
      if (
        !campaign.data.sectors[config.data.sector].cells[id] ||
        campaign.data.sectors[config.data.sector].cells[id].stat == ECellStatus.Empty
      ) {
        // Minimise sequential assignments to the store data to prevent excessive
        // re-rendering of the map
        const c = NewCell(id);
        c.stat = ECellStatus.Passage;
        campaign.data.sectors[config.data.sector].cells[id] = c;
        return;
      }

      // If we've reached here then we probably want to open the dialog and do something with it
      // const c = campaign.data.sectors[config.data.sector].cells[id]
      selectedID.value = id;
      showDialog.value = true;
    };

    // Watch the cells for this sector and re-render on data change
    watch(
      () => campaign.data.sectors[config.data.sector].cells,
      () => renderMap(),
      { deep: true }
    );

    return {
      campaign,
      config,
      hexmap,
      dm,

      click,
      showDialog,
      selectedID,
      ECellStatus,
    };
  },
});
</script>

<style>
svg polygon.hex {
  stroke: black;
  stroke-width: 1pt;
}

/*
svg polygon.hex:hover {
  fill: lightgray;
}
*/
</style>
