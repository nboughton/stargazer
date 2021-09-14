<template>
  <q-card class="my-card">
    <q-card-section class="row items-center justify-between bg-secondary">
      <q-input
        class="col"
        label="Location Name"
        v-model="campaign.data.sectors[sectorID].cells[cellID].name"
        dense
        borderless
        debounce="750"
      />
    </q-card-section>

    <!-- content -->
    <q-card-section class="q-pa-sm">
      <div class="row full-width">
        <q-toggle class="col" icon="mdi-cog" v-model="showControls" />
        <q-select
          class="col-shrink self-end"
          label="Add"
          v-model="addSelect"
          :options="Object.values(ESectorItem)"
          dense
          borderless
        />
        <q-btn class="col-shrink" icon="add" flat dense @click="add" />
        <q-btn class="col-shrink" v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>
      <div v-if="show.stars()">
        <s-star
          class="q-mt-sm"
          v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].stars"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].stars[i]"
          @delete="remove.star(i)"
          :controls="showControls"
          @move="campaign.moveStar(i, { sector: sectorID, cell: cellID }, $event)"
        />
      </div>

      <div v-if="show.planets()">
        <s-planet
          class="q-mt-sm"
          v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].planets"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].planets[i]"
          @delete="remove.planet(i)"
          :controls="showControls"
          @move="campaign.movePlanet(i, { sector: sectorID, cell: cellID }, $event)"
        />
      </div>

      <div v-if="show.sett()">
        <s-settlement
          class="q-mt-sm"
          v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].settlements"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].settlements[i]"
          @delete="remove.settlement(i)"
          :controls="showControls"
          @move="campaign.moveSettlement(i, { sector: sectorID, cell: cellID }, $event)"
        />
      </div>

      <div v-if="show.ships()">
        <s-starship
          class="q-mt-sm"
          v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].ships"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].ships[i]"
          @delete="remove.ship(i)"
          :controls="showControls"
          @move="campaign.moveStarship(i, { sector: sectorID, cell: cellID }, $event)"
        />
      </div>

      <div v-if="show.npcs()">
        <s-NPC
          class="q-mt-sm"
          v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].npcs"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].npcs[i]"
          @delete="remove.npc(i)"
          :controls="showControls"
          @move="campaign.moveNPC(i, { sector: sectorID, cell: cellID }, $event)"
        />
      </div>

      <div v-if="show.creatures()">
        <s-creature
          class="q-mt-sm"
          v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].creatures"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].creatures[i]"
          @delete="remove.creature(i)"
          :controls="showControls"
          @move="campaign.moveCreature(i, { sector: sectorID, cell: cellID }, $event)"
        />
      </div>

      <div v-if="show.derelicts()">
        <s-derelict
          class="q-mt-sm"
          v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].derelicts"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].derelicts[i]"
          @delete="remove.derelict(i)"
          :controls="showControls"
          @move="campaign.moveDerelict(i, { sector: sectorID, cell: cellID }, $event)"
        />
      </div>

      <div v-if="show.vaults()">
        <s-vault
          class="q-mt-sm"
          v-for="(item, i) in campaign.data.sectors[sectorID].cells[cellID].vaults"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].vaults[i]"
          @delete="remove.vault(i)"
          :controls="showControls"
          @move="campaign.moveVault(i, { sector: sectorID, cell: cellID }, $event)"
        />
      </div>
    </q-card-section>
  </q-card>
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
} from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { defineComponent, ref } from 'vue';
import { ESectorItem } from '../models';
import SPlanet from './SPlanet.vue';
import SSettlement from './SSettlement.vue';
import SStar from './SStar.vue';
import SStarship from './SStarship.vue';
import SNPC from './SNPC.vue';
import SCreature from './SCreature.vue';
import SDerelict from './SDerelict.vue';
import SVault from './SVault.vue';
import { useConfig } from 'src/store/config';
export default defineComponent({
  components: { SStar, SPlanet, SSettlement, SStarship, SNPC, SCreature, SDerelict, SVault },
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

        default:
          break;
      }
    };

    const remove = {
      star: (i: number) => {
        campaign.data.sectors[props.sectorID].cells[props.cellID].stars.splice(i, 1);
      },
      planet: (i: number) => {
        campaign.data.sectors[props.sectorID].cells[props.cellID].planets.splice(i, 1);
      },
      settlement: (i: number) => {
        campaign.data.sectors[props.sectorID].cells[props.cellID].settlements.splice(i, 1);
      },
      ship: (i: number) => {
        campaign.data.sectors[props.sectorID].cells[props.cellID].ships.splice(i, 1);
      },
      npc: (i: number) => {
        campaign.data.sectors[props.sectorID].cells[props.cellID].npcs.splice(i, 1);
      },
      creature: (i: number) => {
        campaign.data.sectors[props.sectorID].cells[props.cellID].creatures.splice(i, 1);
      },
      derelict: (i: number) => {
        campaign.data.sectors[props.sectorID].cells[props.cellID].derelicts.splice(i, 1);
      },
      vault: (i: number) => {
        campaign.data.sectors[props.sectorID].cells[props.cellID].vaults.splice(i, 1);
      },
    };

    const show = {
      stars: (): boolean => {
        return (
          campaign.data.sectors[props.sectorID].cells[props.cellID].stars &&
          campaign.data.sectors[props.sectorID].cells[props.cellID].stars.length > 0
        );
      },
      planets: (): boolean => {
        return (
          campaign.data.sectors[props.sectorID].cells[props.cellID].planets &&
          campaign.data.sectors[props.sectorID].cells[props.cellID].planets.length > 0
        );
      },
      sett: (): boolean => {
        return (
          campaign.data.sectors[props.sectorID].cells[props.cellID].settlements &&
          campaign.data.sectors[props.sectorID].cells[props.cellID].settlements.length > 0
        );
      },
      ships: (): boolean => {
        return (
          campaign.data.sectors[props.sectorID].cells[props.cellID].ships &&
          campaign.data.sectors[props.sectorID].cells[props.cellID].ships.length > 0
        );
      },
      npcs: (): boolean => {
        return (
          campaign.data.sectors[props.sectorID].cells[props.cellID].npcs &&
          campaign.data.sectors[props.sectorID].cells[props.cellID].npcs.length > 0
        );
      },
      creatures: (): boolean => {
        return (
          campaign.data.sectors[props.sectorID].cells[props.cellID].creatures &&
          campaign.data.sectors[props.sectorID].cells[props.cellID].creatures.length > 0
        );
      },
      derelicts: (): boolean => {
        return (
          campaign.data.sectors[props.sectorID].cells[props.cellID].derelicts &&
          campaign.data.sectors[props.sectorID].cells[props.cellID].derelicts.length > 0
        );
      },
      vaults: (): boolean => {
        return (
          campaign.data.sectors[props.sectorID].cells[props.cellID].vaults &&
          campaign.data.sectors[props.sectorID].cells[props.cellID].vaults.length > 0
        );
      },
    };

    const config = useConfig();
    const showControls = ref(false);
    return {
      config,
      campaign,

      ESectorItem,
      addSelect,
      add,
      remove,
      show,
      showControls,
    };
  },
});
</script>
