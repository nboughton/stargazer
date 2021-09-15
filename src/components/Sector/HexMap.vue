<template>
  <q-layout
    view="hHh lpR fFf"
    container
    :style="{ width: `${mapConfig.width}px`, 'min-height': `${mapConfig.height + 20}px` }"
  >
    <q-page-container>
      <q-page>
        <div
          class="hexmap"
          ref="hexmap"
          :style="{ width: `${mapConfig.width}px`, height: `${mapConfig.height}px` }"
          @click="click($event)"
        ></div>
      </q-page>
    </q-page-container>

    <q-dialog v-model="showDialog">
      <q-card class="my-card">
        <q-card-section class="row justify-between items-center bg-secondary text-h5">
          <q-input
            class="col"
            label="Cell Name"
            v-model="campaign.data.sectors[config.data.sector].cells[selectedID].name"
            dense
            borderless
            debounce="750"
          />
          <q-btn class="col-shrink" icon="close" flat dense @click="showDialog = false" />
        </q-card-section>

        <q-card-section>
          <div class="row q-gutter-sm items-center">
            <q-select
              class="col-grow"
              label="Set cell status"
              hint="Set to 'location' to save Oracle generated content and enable search for this cell"
              v-model="campaign.data.sectors[config.data.sector].cells[selectedID].stat"
              :options="Object.values(ECellStatus)"
            />
            <q-btn
              class="col-shrink"
              dense
              outline
              label="Go here"
              @click="campaign.data.character.location = selectedID"
            />
          </div>
        </q-card-section>

        <q-card-section>
          <cell :sectorID="config.data.sector" :cellID="selectedID" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { Gradient, Image, Svg, SVG } from '@svgdotjs/svg.js';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { NewCell } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, onMounted, ref, watch, PropType } from 'vue';
import { icon } from 'src/lib/icons';
import { colours } from 'src/lib/colours';
import seedrandom from 'seedrandom';
import { ECellStatus, ESectorOpts, ESettPop, ISearchResults, ISectorCell } from '../models';
import Cell from './Cell.vue';
export default defineComponent({
  components: { Cell },
  name: 'HexMap',
  props: {
    searchResults: {
      type: Object as PropType<ISearchResults>,
      default: <ISearchResults>{},
    },
  },
  setup(props) {
    // Grab stores
    const campaign = useCampaign();
    const config = useConfig();
    const showDialog = ref(false);
    const selectedID = ref('');

    // Instantiate a null ref and set dimenions/id func
    const hexmap = ref(null);
    const mapConfig = {
      height: 400,
      width: 800,
      hexSize: 20,
      animations: false,
    };
    const h = (x: number, y: number): string => {
      return `h-${x}-${y}`;
    };

    // Define initial grid data
    const Hex = extendHex({ size: mapConfig.hexSize });
    const Grid = defineGrid(Hex);
    const grid = Grid.rectangle({
      width: Math.floor(mapConfig.width / (mapConfig.hexSize * 2)) + 3,
      height: Math.floor(mapConfig.height / (mapConfig.hexSize * 2)) + 3,
    });
    const corners = Hex().corners();
    const points = corners.map((p) => `${p.x},${p.y}`).join(' ');

    let map: Svg;
    // All map magic happens here
    const locationFill = (c: ISectorCell): Gradient => {
      const f = map.gradient('radial', function (add) {
        let count = 0;
        const addFn = (n: number, colour: string) => {
          add.stop(count, colour);
          count += n + 1;
        };
        if (c.stars.length > 0) addFn(c.stars.length, colours[ESectorOpts.Stars]);
        if (c.planets.length > 0) addFn(c.planets.length, colours[ESectorOpts.Planets]);
        if (c.settlements.length > 0) addFn(c.settlements.length, colours[ESectorOpts.Settlements]);
        if (c.ships.length > 0) addFn(c.ships.length, colours[ESectorOpts.Ships]);
        if (c.derelicts.length > 0) addFn(c.derelicts.length, colours[ESectorOpts.Derelicts]);
        if (c.vaults.length > 0) addFn(c.vaults.length, colours[ESectorOpts.Vaults]);
        if (c.creatures.length > 0) addFn(c.creatures.length, colours[ESectorOpts.Creatures]);
        if (c.npcs.length > 0) add.stop(c.npcs.length, colours[ESectorOpts.NPCs]);
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
      if (c.stars.length > 0) path = icon.star();

      const i = SVG()
        .image(path.replace('img:', ''))
        .addClass('icon')
        .size(mapConfig.hexSize, mapConfig.hexSize)
        .addTo(map)
        .move(x + (mapConfig.hexSize / 2) * 0.7, y + mapConfig.hexSize / 2);

      i.mouseenter(() => {
        i.animate(100).transform({ scale: 1.3 });
      });

      i.mouseleave(() => {
        i.animate(100).transform({ scale: 1 });
      });
    };

    const locationLabel = (c: ISectorCell, x: number, y: number) => {
      let label = c.name;
      const v: { [index: string]: number } = {
        [ESettPop.Few]: 1,
        [ESettPop.Dozens]: 2,
        [ESettPop.Hundreds]: 3,
        [ESettPop.Thousands]: 4,
        [ESettPop.TensOfThou]: 5,
      };

      if (c.npcs.length > 0) label = c.npcs[0].name;
      if (c.creatures.length > 0) label = c.creatures[0].name;
      if (c.vaults.length > 0) label = c.vaults[0].name;
      if (c.derelicts.length > 0) label = c.derelicts[0].name;
      if (c.ships.length > 0) label = c.ships[0].name;
      if (c.planets.length > 0) label = c.planets[0].name;
      if (c.stars.length > 0) label = c.stars[0].name;
      if (c.settlements.length > 0) {
        let largest = 0;
        c.settlements.forEach((s) => {
          if (v[s.population] && v[s.population] > largest) {
            largest = v[s.population];
            label = s.name;
          }
        });
      }

      const t = SVG()
        .text(label)
        .addClass('label')
        .addTo(map)
        .font({ fill: '#fff', family: 'Encode', size: mapConfig.hexSize * 0.9 });

      t.move(x + mapConfig.hexSize * 2, y + mapConfig.hexSize / 2.4);
    };

    let playerShip: Image; // Declare this out here so it can be manipulated in a watch func

    const renderMap = () => {
      map.clear();

      // Render a star field
      // Get a pseudorandom generator to produce consistent results
      const random = seedrandom(
        campaign.data.sectors[config.data.sector].name + ':' + campaign.data.sectors[config.data.sector].region
      );

      // const star = SVG().polygon('50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40');
      const star = SVG().circle('10');
      for (let i = 0; i < Math.floor(grid.length * 1.5); i++) {
        const hw = Math.floor(random() * (mapConfig.hexSize / 4));
        const x = Math.floor(random() * mapConfig.width - 1);
        const y = Math.floor(random() * mapConfig.height - 1);

        const r = Math.floor(random() * 64) + 194;
        const g = Math.floor(random() * 64) + 194;
        const b = Math.floor(random() * 64) + 194;

        const n = star.clone();
        n.fill(`rgb(${r}, ${g}, ${b})`).size(hw, hw).addTo(map).move(x, y).back();

        if (mapConfig.animations) {
          if (i % 10 == 0) {
            n.animate(2000 + Math.floor(Math.random() * 5000))
              .attr({ fill: '#2e3440' })
              .loop();
          }
        }
      }

      // Place hexes and content
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
              locationLabel(c, x, y);
              break;

            case ECellStatus.Passage:
              cell.fill('#393B61');
              break;

            default:
              cell.fill('none');
              break;
          }
        } else {
          cell.fill('none');
        }

        // Add player ship
        if (campaign.data.character.location === id) {
          playerShip = SVG().image(icon.player().replace('img:', ''));

          playerShip
            .addClass('ship')
            .size(mapConfig.hexSize, mapConfig.hexSize)
            .addTo(map)
            .move(x + mapConfig.hexSize, y);
        }

        // Add search results
        if (props.searchResults != {} && props.searchResults[config.data.sector]) {
          if (props.searchResults[config.data.sector][id]) {
            const cell = props.searchResults[config.data.sector][id];
            const hex = map.find(`.${id}`);

            if (hex.length > 0) {
              const text = SVG().text(function (add) {
                Object.keys(cell).forEach((oType) => {
                  cell[oType].forEach((i) => {
                    add
                      .tspan(campaign.data.sectors[config.data.sector].cells[id][oType as ESectorOpts][i].name)
                      .fill(colours[oType])
                      .newLine();
                  });
                });
              });

              text
                .addClass('search-label')
                .addTo(map)
                .font({ fill: 'lightgreen', family: 'Encode', size: mapConfig.hexSize * 0.7 });

              text.move(x, y + mapConfig.hexSize * 2);
            }
          }
        }
      });

      // Move player ship to the front
      const ship = map.find('.ship');
      if (ship.length > 0) {
        ship[0].front();
      }
      // Move all the text to the front
      map.find('.label').forEach((e) => e.front());
      map.find('.search-label').forEach((e) => e.front());
    };

    watch(
      () => campaign.data.character.location,
      () => {
        renderMap();
      }
    );

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

    watch(
      () => props.searchResults,
      () => renderMap(),
      { deep: true }
    );
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
      mapConfig,

      click,
      showDialog,
      selectedID,
      ECellStatus,
    };
  },
});
</script>

<style lang="sass">
svg polygon.hex
  stroke: $secondary
  stroke-width: 1pt

svg .search-label
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.5)
</style>
