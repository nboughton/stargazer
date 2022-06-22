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

  <q-dialog v-model="showDialog" transition-show="fade" transition-hide="fade" :maximized="$q.platform.is.mobile">
    <q-card class="card-bg" style="min-width: 40%">
      <q-card-section class="row justify-between items-center bg-secondary text-h5">
        <q-input
          class="col"
          label="Cell Name"
          v-model="campaign.data.sectors[config.data.sector].cells[selectedID].name"
          dense
          borderless
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
import { defineComponent, onMounted, ref, watch, PropType } from 'vue';

import { ECellStatus, ESectorOpts, ISearchResults } from '../models';

import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';

import { CellLabel, NewCell } from 'src/lib/sector';
import { Svg, SVG } from '@svgdotjs/svg.js';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { icon } from 'src/lib/icons';
import { colours } from 'src/lib/colours';
import seedrandom from 'seedrandom';

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

    // Instantiate a null ref
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
    onMounted(() => {
      map = SVG()
        .addTo(hexmap.value as unknown as HTMLElement)
        .size('100%', '100%');
      console.log('initial map render');
      fullRender();
      renderPlayer();
    });

    /* MAP RENDER FUNCTIONS */
    const getXY = (id: string): { x: number; y: number } => {
      const s = id.split(/-/g);
      if (s.length === 3) {
        // h, x, y
        const hex = grid.get({ x: +s[1], y: +s[2] });
        if (hex) {
          const { x, y } = hex.toPoint();
          return { x: x, y: y };
        }
      }
      return { x: 0, y: 0 };
    };

    const fullRender = () => {
      renderMap();
      renderStarfield();
      renderFills();
      renderIcons();
      renderLabels();
      renderSearch();
      // renderPlayer();
    };

    const renderFills = () => {
      const cells = campaign.data.sectors[config.data.sector].cells;
      Object.keys(cells).forEach((id) => {
        map.find(`.${id}`).forEach((cell) => {
          const c = cells[id];
          switch (c.stat) {
            case ECellStatus.Location:
              cell.fill(
                map.gradient('linear', function (add) {
                  let count = 0;
                  const addFn = (colour: string) => {
                    add.stop(count, colour);
                    count++;
                  };
                  if (c.stars.length > 0) addFn(colours[ESectorOpts.Stars]);
                  if (c.planets.length > 0) addFn(colours[ESectorOpts.Planets]);
                  if (c.settlements.length > 0) addFn(colours[ESectorOpts.Settlements]);
                  if (c.ships.length > 0) addFn(colours[ESectorOpts.Ships]);
                  if (c.derelicts.length > 0) addFn(colours[ESectorOpts.Derelicts]);
                  if (c.vaults.length > 0) addFn(colours[ESectorOpts.Vaults]);
                  if (c.creatures.length > 0) addFn(colours[ESectorOpts.Creatures]);
                  if (c.npcs.length > 0) addFn(colours[ESectorOpts.NPCs]);
                  if (c.sightings.length > 0) addFn(colours[ESectorOpts.Sightings]);
                })
              );
              break;

            case ECellStatus.Passage:
              cell.fill(colours.Passage);
              break;

            default:
              cell.fill('none');
              break;
          }
        });
      });
    };

    const renderIcons = () => {
      // Clear any existing icon groups
      map.find('.icons').forEach((i) => i.remove());

      // Create a new group
      const icons = SVG().group().addClass('icons');

      // Populate it
      const cells = campaign.data.sectors[config.data.sector].cells;
      Object.keys(cells).forEach((id) => {
        const c = cells[id];
        if (c.stat != ECellStatus.Location) return;

        const { x, y } = getXY(id);
        let path = '';
        if (c.sightings.length > 0) path = icon.sighting(c.sightings[0].name);
        if (c.npcs.length > 0) path = icon.npc();
        if (c.creatures.length > 0) path = icon.creature(c.creatures[0].form);
        if (c.vaults.length > 0) path = icon.vault();
        if (c.derelicts.length > 0) path = icon.derelict();
        if (c.ships.length > 0) path = icon.starship();
        if (c.settlements.length > 0) path = icon.settlement();
        if (c.planets.length > 0) path = icon.planet(c.planets[0].type);
        if (c.stars.length > 0) path = icon.star(c.stars[0].description);

        const i = SVG()
          .image(path)
          .addClass('icon')
          .size(config.data.map.hexSize, config.data.map.hexSize)
          .addTo(icons)
          .move(x + (config.data.map.hexSize / 2) * 0.7, y + config.data.map.hexSize / 2);

        i.mouseenter(() => {
          i.animate(100).transform({ scale: 1.3 });
        });

        i.mouseleave(() => {
          i.animate(100).transform({ scale: 1 });
        });
      });

      // Slap it on the map
      icons.addTo(map);

      // Move the ship icon to the front just in case
      map.find('.ship').forEach((s) => s.front());
    };

    const renderStarfield = () => {
      // Clear an existing starfield if it exists
      map.find('.starfield').forEach((i) => i.remove());

      if (!config.data.map.starfield) return;

      // Render a star field
      const stars = SVG().group().addClass('starfield');
      // Get a pseudorandom generator to produce consistent results)
      const random = seedrandom(
        `${campaign.data.sectors[config.data.sector].name}:${campaign.data.sectors[config.data.sector].region}`
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

        if (config.data.map.animations && i % 10 == 0) {
          n.animate(2000 + Math.floor(Math.random() * 5000))
            .attr({ fill: '#2e3440' })
            .loop();
        }
      }

      stars.addTo(map).back();
    };

    const renderLabels = () => {
      map.find('.labels').forEach((i) => i.remove());

      // Create a new group
      const labels = SVG().group().addClass('labels');

      // Populate it
      const cells = campaign.data.sectors[config.data.sector].cells;
      Object.keys(cells).forEach((id) => {
        const c = cells[id];

        if (c.stat === ECellStatus.Location) {
          const { label, type } = CellLabel(c, id);
          const { x, y } = getXY(id);

          SVG()
            .text(label)
            .addClass('label')
            .addTo(labels)
            .font({ fill: colours[type] || 'white', weight: 'bold', size: config.data.map.hexSize * 0.8 })
            .stroke({ color: 'black', width: 1 })
            .move(x - config.data.map.hexSize * 0.5, y - config.data.map.hexSize * 1);
        }
      });

      labels.addTo(map).front();
    };

    const renderSearch = () => {
      //clear existing search labels
      map.find('.search-label').forEach((i) => i.remove());

      if (!(props.searchResults != {} && props.searchResults[config.data.sector])) return;

      // Add search results
      Object.keys(props.searchResults[config.data.sector]).forEach((id) => {
        if (campaign.data.sectors[config.data.sector].cells[id]) {
          const { x, y } = getXY(id);
          const cell = props.searchResults[config.data.sector][id];
          const { label } = CellLabel(campaign.data.sectors[config.data.sector].cells[id], id);

          if (map.find(`.${id}`).length > 0) {
            SVG()
              .text(function (add) {
                Object.keys(cell).forEach((oType) => {
                  cell[oType].forEach((i) => {
                    const c = campaign.data.sectors[config.data.sector].cells[id][oType as ESectorOpts][i];
                    if (c && c.name !== label) {
                      add.tspan(c.name).stroke({ color: 'black', width: 1 }).fill(colours[oType]).newLine();
                    }
                  });
                });
              })
              .addClass('search-label')
              .addTo(map)
              .move(x, y + config.data.map.hexSize * 2)
              .font({ size: config.data.map.hexSize * 0.7, weight: 'bold' });
          }
        }
      });
    };

    const renderPlayer = () => {
      if (campaign.data.character.location != '') {
        // Clear existing player ship
        map.find('.ship').forEach((i) => i.remove());

        const { x, y } = getXY(campaign.data.character.location);

        SVG()
          .image(icon.player().replace('img:', ''))
          .addClass('ship')
          .size(config.data.map.hexSize, config.data.map.hexSize)
          .addTo(map)
          .move(x + config.data.map.hexSize, y)
          .front();
      }
    };

    const renderMap = () => {
      map.clear();

      // Place hexes and content
      grid.forEach((hex) => {
        const { x, y } = hex.toPoint();
        const id = h(hex.x, hex.y);
        const cell = map.polygon(points).addClass('hex').addClass(id);
        cell.translate(x, y);
        cell.fill('none');
      });
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
        map.find(`.${id}`).forEach((c) => c.fill(colours.Passage));

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
      () => renderStarfield(),
      { deep: true }
    );

    watch(
      () => campaign.data.character.location,
      () => renderPlayer()
    );

    watch(
      () => props.searchResults,
      () => renderSearch(),
      { deep: true }
    );

    watch(
      () => campaign.$state.data.sectors[config.data.sector].cells,
      () => {
        renderFills();
        renderIcons();
        renderLabels();
      },
      { deep: true }
    );

    watch(
      () => config.data.sector,
      () => fullRender()
    );

    watch(
      () => campaign.data.id,
      () => fullRender()
    );

    watch(
      () => campaign.data.sectors[config.data.sector].name,
      () => renderStarfield()
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
