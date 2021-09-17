<template>
  <q-layout
    view="hHh lpR fFf"
    container
    :style="{ width: `${config.data.map.width}px`, 'min-height': `${config.data.map.height + 20}px` }"
  >
    <q-page-container>
      <q-page>
        <div
          class="hexmap"
          ref="hexmap"
          :style="{ width: `${config.data.map.width}px`, height: `${config.data.map.height}px` }"
          @click="click($event)"
        ></div>
      </q-page>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="showDialog" transition-show="fade" transition-hide="fade">
    <q-card class="my-card" style="min-width: 40%">
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

      <q-card-section class="q-pa-sm q-mb-sm">
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

      <q-card-section class="q-pa-sm">
        <cell :sectorID="config.data.sector" :cellID="selectedID" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { G, Gradient, Image, Svg, SVG } from '@svgdotjs/svg.js';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { CellLabel, NewCell } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, onMounted, ref, watch, PropType } from 'vue';
import { icon } from 'src/lib/icons';
import { colours } from 'src/lib/colours';
import seedrandom from 'seedrandom';
import { ECellStatus, ESectorOpts, ISearchResults, ISectorCell } from '../models';
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
    const h = (x: number, y: number): string => {
      return `h-${x}-${y}`;
    };

    // Define initial grid data
    const Hex = extendHex({ size: config.data.map.hexSize });
    const Grid = defineGrid(Hex);
    const grid = Grid.rectangle({
      width: Math.floor(config.data.map.width / (config.data.map.hexSize * 2)) + 3,
      height: Math.floor(config.data.map.height / (config.data.map.hexSize * 2)) + 3,
    });
    const corners = Hex().corners();
    const points = corners.map((p) => `${p.x},${p.y}`).join(' ');

    let map: Svg;
    let playerShip: Image;
    let starfield: G;

    onMounted(() => {
      map = SVG()
        .addTo(hexmap.value as unknown as HTMLElement)
        .size('100%', '100%');
      console.log('initial map render');
      renderMap();
    });

    /* MAP RENDER FUNCTIONS */
    const locationFill = (c: ISectorCell): Gradient => {
      const f = map.gradient('linear', function (add) {
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
        .size(config.data.map.hexSize, config.data.map.hexSize)
        .addTo(map)
        .move(x + (config.data.map.hexSize / 2) * 0.7, y + config.data.map.hexSize / 2);

      i.mouseenter(() => {
        i.animate(100).transform({ scale: 1.3 });
      });

      i.mouseleave(() => {
        i.animate(100).transform({ scale: 1 });
      });
    };

    const locationLabel = (c: ISectorCell, x: number, y: number) => {
      let label = CellLabel(c);

      const t = SVG()
        .text(label)
        .addClass('label')
        .addTo(map)
        .font({ fill: '#fff', family: 'Encode', size: config.data.map.hexSize * 0.9 })
        .stroke({ color: 'black', width: 1 });

      t.move(x + config.data.map.hexSize * 2, y + config.data.map.hexSize / 2.4);
    };

    const renderStarfield = (): G => {
      console.log('rendering starfield');
      // Render a star field
      const stars = SVG().group();
      // Get a pseudorandom generator to produce consistent results)
      const random = seedrandom(
        campaign.data.sectors[config.data.sector].name + ':' + campaign.data.sectors[config.data.sector].region
      );

      const star = SVG().circle('10');
      for (let i = 0; i < Math.floor(grid.length * 1.5); i++) {
        const hw = Math.floor(random() * (config.data.map.hexSize / 4));
        const x = Math.floor(random() * config.data.map.width - 1);
        const y = Math.floor(random() * config.data.map.height - 1);

        const r = Math.floor(random() * 64) + 194;
        const g = Math.floor(random() * 64) + 194;
        const b = Math.floor(random() * 64) + 194;

        const n = star.clone();
        n.fill(`rgb(${r}, ${g}, ${b})`).size(hw, hw).addTo(stars).dx(x).dy(y);

        if (config.data.map.animations) {
          if (i % 10 == 0) {
            n.animate(2000 + Math.floor(Math.random() * 5000))
              .attr({ fill: '#2e3440' })
              .loop();
          }
        }
      }

      return stars;
    };

    if (config.data.map.starfield) starfield = renderStarfield();
    let lastRender = 0;
    let lastSector = config.data.sector;
    const passageColour = '#393B61';

    const renderMap = () => {
      // Prevent excessive rendering on passage mark/sector change
      const renderTimestamp = Date.now();
      if (renderTimestamp - lastRender < 500 && lastSector == config.data.sector) {
        console.log('ignoring double render');
        return;
      }
      lastRender = renderTimestamp;
      lastSector = config.data.sector;

      map.clear();

      if (config.data.map.starfield) starfield.addTo(map).move(0, 0).back();

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
              cell.fill(passageColour);
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
            .size(config.data.map.hexSize, config.data.map.hexSize)
            .addTo(map)
            .move(x + config.data.map.hexSize, y);
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
                    if (campaign.data.sectors[config.data.sector].cells[id][oType as ESectorOpts][i]) {
                      add
                        .tspan(campaign.data.sectors[config.data.sector].cells[id][oType as ESectorOpts][i].name)
                        .stroke({ color: 'black', width: 1 })
                        .fill(colours[oType])
                        .newLine();
                    }
                  });
                });
              });

              text
                .addClass('search-label')
                .addTo(map)
                .font({ fill: 'lightgreen', family: 'Encode', size: config.data.map.hexSize * 0.7, weight: 'bold' });

              text.move(x, y + config.data.map.hexSize * 2);
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

    // PRIMARY CLICK EVENT
    const click = (ev: { offsetX: number; offsetY: number }) => {
      // Get the SVG hex that was clicked on
      const hex = grid.get(Grid.pointToHex(ev.offsetX, ev.offsetY));

      // Derive its ID
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const id = h(hex!.x, hex!.y);

      // If no data exists for the cell then create it initially and make it a passage
      // Note that all changes to cell data should happen in the renderMap function as
      // the map will re-render whenever the underlying cell data changes.
      if (
        !campaign.data.sectors[config.data.sector].cells[id] ||
        campaign.data.sectors[config.data.sector].cells[id].stat == ECellStatus.Empty
      ) {
        // Set hex fill here (rather than trigger a map re-render) for better mobile performance
        const mapCells = map.find(`.${id}`); // Should only return 1 item but err on the side of caution
        if (mapCells.length > 0) {
          mapCells[0].fill(passageColour);
          lastRender = Date.now(); // Setting this will prevent an immediate re-render when the data changes
        }

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

    /* RENDER TRIGGERS */
    watch(
      () => config.data.map,
      () => {
        console.log('Config triggered render');
        if (config.data.map.starfield) {
          starfield = renderStarfield();
        }
        renderMap();
      },
      { deep: true }
    );

    watch(
      () => campaign.data.character.location,
      () => {
        console.log('Character location triggered map render');
        renderMap();
      }
    );

    watch(
      () => props.searchResults,
      () => {
        console.log('Search result triggered map render');
        renderMap();
      },
      { deep: true }
    );

    watch(
      () => campaign.data.sectors[config.data.sector].cells,
      () => {
        console.log('Data change triggered map render');
        renderMap();
      },
      { deep: true }
    );

    watch(
      () => config.data.sector,
      () => {
        starfield = renderStarfield();
        renderMap();
      }
    );

    return {
      campaign,
      config,
      hexmap,

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

svg .search-label, .label
  paint-order: stroke fill
</style>
