<template>
  <q-card class="my-card">
    <!-- controls -->
    <q-card-section class="row items-center justify-between bg-secondary">
      <q-input class="col-grow" label="Name" v-model="campaign.data.sectors[sectorID].cells[cellID].name" dense borderless debounce="750" />
      <div class="col-shrink">
        <div class="row full-width">
          <q-select class="col-grow" label="Add" v-model="addSelect" :options="Object.values(ESectorItem)" dense borderless />
          <q-btn class="col-shrink" icon="add" flat dense @click="add" />
        </div>
      </div>
    </q-card-section>

    <!-- content -->
    <q-card-section>
      <q-expansion-item v-if="show.stars()" header-class="text-h5 custom-header" label="Stars">
        <s-star
          class="q-mt-sm"
          v-for="(star, i) in campaign.data.sectors[sectorID].cells[cellID].stars"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].stars[i]"
          @delete="remove.star(i)"
        />
      </q-expansion-item>

      <q-expansion-item v-if="show.planets()" header-class="text-h5 custom-header" label="Planets">
        <s-planet
          class="q-mt-sm"
          v-for="(planet, i) in campaign.data.sectors[sectorID].cells[cellID].planets"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].planets[i]"
          @delete="remove.planet(i)"
        />
      </q-expansion-item>

      <q-expansion-item v-if="show.sett()" header-class="text-h5 custom-header" label="Settlements">
        <s-settlement
          class="q-mt-sm"
          v-for="(sett, i) in campaign.data.sectors[sectorID].cells[cellID].settlements"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].settlements[i]"
          @delete="remove.settlement(i)"
        />
      </q-expansion-item>

      <q-expansion-item v-if="show.ships()" header-class="text-h5 custom-header" label="Starships">
        <s-starship
          class="q-mt-sm"
          v-for="(ship, i) in campaign.data.sectors[sectorID].cells[cellID].ships"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].ships[i]"
          @delete="remove.ship(i)"
        />
      </q-expansion-item>

      <q-expansion-item v-if="show.npcs()" header-class="text-h5 custom-header" label="People">
        <s-NPC
          class="q-mt-sm"
          v-for="(npc, i) in campaign.data.sectors[sectorID].cells[cellID].npcs"
          :key="i"
          v-model="campaign.data.sectors[sectorID].cells[cellID].npcs[i]"
          @delete="remove.npc(i)"
        />
      </q-expansion-item>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { NewStar, NewPlanet, NewSettlement, NewShip, NewNPC } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { defineComponent, ref } from 'vue';
import { ESectorItem } from '../models';
import SPlanet from './SPlanet.vue';
import SSettlement from './SSettlement.vue';
import SStar from './SStar.vue';
import SStarship from './SStarship.vue';
import SNPC from './SNPC.vue';
export default defineComponent({
  components: { SStar, SPlanet, SSettlement, SStarship, SNPC },
  name: 'Cell',
  props: {
    sectorID: {
      type: Number,
      required: true,
    },
    cellID: {
      type: Number,
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
    };

    const show = {
      stars: (): boolean => {
        return campaign.data.sectors[props.sectorID].cells[props.cellID].stars && campaign.data.sectors[props.sectorID].cells[props.cellID].stars.length > 0;
      },
      planets: (): boolean => {
        return campaign.data.sectors[props.sectorID].cells[props.cellID].planets && campaign.data.sectors[props.sectorID].cells[props.cellID].planets.length > 0;
      },
      sett: (): boolean => {
        return campaign.data.sectors[props.sectorID].cells[props.cellID].settlements && campaign.data.sectors[props.sectorID].cells[props.cellID].settlements.length > 0;
      },
      ships: (): boolean => {
        return campaign.data.sectors[props.sectorID].cells[props.cellID].ships && campaign.data.sectors[props.sectorID].cells[props.cellID].ships.length > 0;
      },
      npcs: (): boolean => {
        return campaign.data.sectors[props.sectorID].cells[props.cellID].npcs && campaign.data.sectors[props.sectorID].cells[props.cellID].npcs.length > 0;
      },
    };

    return {
      campaign,

      ESectorItem,
      addSelect,
      add,
      remove,
      show,
    };
  },
});
</script>
