<template>
  <!-- content -->
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
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].stars"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].stars[i]"
        @delete="campaign.removeObject(ESectorOpts.Stars, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.moveStar(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Planets)">
      <s-planet
        class="q-mt-sm"
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].planets"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].planets[i]"
        @delete="campaign.removeObject(ESectorOpts.Planets, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.movePlanet(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Settlements)">
      <s-settlement
        class="q-mt-sm"
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].settlements"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].settlements[i]"
        @delete="campaign.removeObject(ESectorOpts.Settlements, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.moveSettlement(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Ships)">
      <s-starship
        class="q-mt-sm"
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].ships"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].ships[i]"
        @delete="campaign.removeObject(ESectorOpts.Ships, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.moveStarship(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.NPCs)">
      <s-NPC
        class="q-mt-sm"
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].npcs"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].npcs[i]"
        @delete="campaign.removeObject(ESectorOpts.NPCs, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.moveNPC(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Creatures)">
      <s-creature
        class="q-mt-sm"
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].creatures"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].creatures[i]"
        @delete="campaign.removeObject(ESectorOpts.Creatures, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.moveCreature(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Derelicts)">
      <s-derelict
        class="q-mt-sm"
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].derelicts"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].derelicts[i]"
        @delete="campaign.removeObject(ESectorOpts.Derelicts, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.moveDerelict(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Vaults)">
      <s-vault
        class="q-mt-sm"
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].vaults"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].vaults[i]"
        @delete="campaign.removeObject(ESectorOpts.Vaults, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.moveVault(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>

    <div v-if="show(ESectorOpts.Sightings)">
      <s-sighting
        class="q-mt-sm"
        v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].sightings"
        :key="i"
        v-model="campaign.data.sectors[sectorID].cells[cellID].sightings[i]"
        @delete="campaign.removeObject(ESectorOpts.Sightings, sectorID, cellID, i)"
        :controls="showControls"
        @move="campaign.moveSighting(i, { sector: sectorID, cell: cellID }, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
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
} from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { defineComponent, ref } from 'vue';
import { ESectorItem, ESectorOpts } from '../models';
import SPlanet from './SPlanet.vue';
import SSettlement from './SSettlement.vue';
import SStar from './SStar.vue';
import SStarship from './SStarship.vue';
import SNPC from './SNPC.vue';
import SCreature from './SCreature.vue';
import SDerelict from './SDerelict.vue';
import SVault from './SVault.vue';
import SSighting from './SSighting.vue';
import { useConfig } from 'src/store/config';
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
    const campaign = useCampaign();
    const addSelect = ref('Select');
    const add = () => {
      switch (addSelect.value) {
        case ESectorItem.Star:
          campaign.data.sectors[props.sectorID].cells[props.cellID].stars.unshift(NewStar());
          break;

        case ESectorItem.Planet:
          campaign.data.sectors[props.sectorID].cells[props.cellID].planets.unshift(NewPlanet());
          break;

        case ESectorItem.Settlement:
          campaign.data.sectors[props.sectorID].cells[props.cellID].settlements.unshift(NewSettlement());
          break;

        case ESectorItem.Ship:
          campaign.data.sectors[props.sectorID].cells[props.cellID].ships.unshift(NewShip());
          break;

        case ESectorItem.Person:
          campaign.data.sectors[props.sectorID].cells[props.cellID].npcs.unshift(NewNPC());
          break;

        case ESectorItem.Creature:
          campaign.data.sectors[props.sectorID].cells[props.cellID].creatures.unshift(NewCreature());
          break;

        case ESectorItem.Derelict:
          campaign.data.sectors[props.sectorID].cells[props.cellID].derelicts.unshift(NewDerelict());
          break;

        case ESectorItem.Vault:
          campaign.data.sectors[props.sectorID].cells[props.cellID].vaults.unshift(NewVault());
          break;

        case ESectorItem.Sighting:
          campaign.data.sectors[props.sectorID].cells[props.cellID].sightings.unshift(NewSighting());
        default:
          break;
      }
    };

    const show = (type: ESectorOpts): boolean => {
      return (
        campaign.data.sectors[props.sectorID].cells[props.cellID][type] &&
        campaign.data.sectors[props.sectorID].cells[props.cellID][type].length > 0
      );
    };

    const config = useConfig();
    const showControls = ref(false);
    return {
      config,
      campaign,

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
