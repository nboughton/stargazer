<template>
  <!-- content -->
  <!-- file deepcode ignore PureFunctionReturnValueIgnored: value passed to component -->
  <div>
    <div class="row full-width q-gutter-sm justify-between items-center">
      <q-toggle class="col" icon="mdi-cog" v-model="showControls" label="Move Controls" />
      <q-select
        class="col-shrink"
        label="Add"
        v-model="addSelect"
        :options="Object.values(ESectorItem)"
        dense
        borderless
      />
      <q-btn class="col-shrink" icon="add" flat dense @click="add" />
    </div>
    <div v-if="show(ESectorOpts.Stars)">
      <s-star
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].stars"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].stars[i]"
        @delete="app.removeObject(ESectorOpts.Stars, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.Stars, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Planets)">
      <s-planet
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].planets"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].planets[i]"
        @delete="app.removeObject(ESectorOpts.Planets, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.Planets, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Settlements)">
      <s-settlement
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].settlements"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].settlements[i]"
        @delete="app.removeObject(ESectorOpts.Settlements, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.Settlements, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Ships)">
      <s-starship
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].ships"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].ships[i]"
        @delete="app.removeObject(ESectorOpts.Ships, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.Ships, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.NPCs)">
      <s-NPC
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].npcs"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].npcs[i]"
        @delete="app.removeObject(ESectorOpts.NPCs, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.NPCs, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Creatures)">
      <s-creature
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].creatures"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].creatures[i]"
        @delete="app.removeObject(ESectorOpts.Creatures, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.Creatures, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Derelicts)">
      <s-derelict
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].derelicts"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].derelicts[i]"
        @delete="app.removeObject(ESectorOpts.Derelicts, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.Derelicts, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Vaults)">
      <s-vault
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].vaults"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].vaults[i]"
        @delete="app.removeObject(ESectorOpts.Vaults, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.Vaults, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Sightings)">
      <s-sighting
        class="q-mt-sm"
        v-for="(item, i) in app.ca.sectors[sectorID].cells[cellID].sightings"
        :key="i"
        v-model="app.ca.sectors[sectorID].cells[cellID].sightings[i]"
        @delete="app.removeObject(ESectorOpts.Sightings, sectorID, cellID, i)"
        :controls="showControls"
        @move="app.moveItem(item as never, ESectorOpts.Sightings, i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { ESectorItem, ESectorOpts } from '../models';

import { useCampaign } from 'src/store/campaign';

import {
  NewStar,
  NewPlanet,
  NewSettlement,
  NewShip,
  NewNPC,
  NewCreature,
  NewDerelict,
  NewVault,
  NewSighting,
} from 'src/lib/sector';

import SPlanet from './SPlanet.vue';
import SSettlement from './SSettlement.vue';
import SStar from './SStar.vue';
import SStarship from './SStarship.vue';
import SNPC from './SNPC.vue';
import SCreature from './SCreature.vue';
import SDerelict from './SDerelict.vue';
import SVault from './SVault.vue';
import SSighting from './SSighting.vue';

export default defineComponent({
  components: { SStar, SPlanet, SSettlement, SStarship, SNPC, SCreature, SDerelict, SVault, SSighting },
  name: 'Cell',
  props: {
    sectorID: {
      type: Number,
      required: true,
    },
    cellID: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const app = useCampaign();
    const addSelect = ref('Select');
    const add = () => {
      switch (addSelect.value) {
        case ESectorItem.Star:
          app.ca.sectors[props.sectorID].cells[props.cellID].stars.unshift(NewStar());
          break;

        case ESectorItem.Planet:
          app.ca.sectors[props.sectorID].cells[props.cellID].planets.unshift(NewPlanet());
          break;

        case ESectorItem.Settlement:
          app.ca.sectors[props.sectorID].cells[props.cellID].settlements.unshift(NewSettlement());
          break;

        case ESectorItem.Ship:
          app.ca.sectors[props.sectorID].cells[props.cellID].ships.unshift(NewShip());
          break;

        case ESectorItem.Person:
          app.ca.sectors[props.sectorID].cells[props.cellID].npcs.unshift(NewNPC());
          break;

        case ESectorItem.Creature:
          app.ca.sectors[props.sectorID].cells[props.cellID].creatures.unshift(NewCreature());
          break;

        case ESectorItem.Derelict:
          app.ca.sectors[props.sectorID].cells[props.cellID].derelicts.unshift(NewDerelict());
          break;

        case ESectorItem.Vault:
          app.ca.sectors[props.sectorID].cells[props.cellID].vaults.unshift(NewVault());
          break;

        case ESectorItem.Sighting:
          app.ca.sectors[props.sectorID].cells[props.cellID].sightings.unshift(NewSighting());
        default:
          break;
      }
    };

    const show = (type: ESectorOpts): boolean => {
      return (
        app.ca.sectors[props.sectorID].cells[props.cellID][type] &&
        app.ca.sectors[props.sectorID].cells[props.cellID][type].length > 0
      );
    };

    const showControls = ref(false);
    return {
      app,

      ESectorItem,
      ESectorOpts,
      addSelect,
      add,
      show,
      showControls,
    };
  },
});
</script>
