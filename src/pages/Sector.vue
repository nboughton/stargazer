<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-sm q-mb-md">
      <q-btn class="col-shrink" flat dense icon="add_circle" @click="addSector" />
      <q-select
        class="col"
        label="Sector"
        v-model="config.data.sector"
        :options="sectorOpts"
        map-options
        emit-value
        standout="bg-blue-grey text-white"
        :input-style="{ color: '#ECEFF4' }"
        dense
      />
      <q-btn
        v-if="campaign.data.sectors.length > 1 && config.data.edit"
        class="col-shrink"
        flat
        dense
        icon="delete"
        @click="removeSector"
      />
      <q-select
        class="col"
        label="Region"
        v-model="campaign.data.sectors[config.data.sector].region"
        :options="Object.values(ERegion)"
        standout="bg-blue-grey text-white"
        :input-style="{ color: '#ECEFF4' }"
        dense
      />
      <i-input class="col" label="Faction/Control" v-model="campaign.data.sectors[config.data.sector].control" />
    </div>

    <div class="row justify-center q-mb-sm">
      <hex-map-2 />
    </div>

    <div class="row q-gutter-sm q-mb-sm">
      <i-input class="col" label="Sector name" v-model="campaign.data.sectors[config.data.sector].name" />
      <i-input class="col" label="Search" v-model="searchText" clearable />
      <q-select
        class="col"
        label="Filters"
        v-model="filters"
        :options="Object.values(fOpts)"
        multiple
        clearable
        standout="bg-blue-grey text-white"
        :input-style="{ color: '#ECEFF4' }"
        dense
      />
      <q-btn class="col-shrink" icon="add_circle" flat dense @click="addCell">
        <q-tooltip>Add location</q-tooltip>
      </q-btn>
    </div>

    <div class="column q-mt-md">
      <div v-if="(!filters || filters.length === 0) && (!searchText || searchText.length === 0)">
        <cell
          class="q-mb-md"
          v-for="(cell, index) in campaign.data.sectors[config.data.sector].cells"
          :key="index"
          :sectorID="config.data.sector"
          :cellID="index"
          @delete="removeCell(index)"
        />
      </div>
      <div v-else>
        <div v-for="(cell, cIndex) in campaign.data.sectors[config.data.sector].cells" :key="cIndex">
          <div v-for="(item, iIndex) in campaign.data.sectors[config.data.sector].cells[cIndex]" :key="iIndex">
            <!-- use custom search func to Show() items based on searchText params -->
            <div
              v-if="
                ((searchText && !applyFilters) || (applyFilters && filters.includes(fOpts.Stars))) &&
                iIndex === fOpts.Stars &&
                item.length > 0
              "
            >
              <div v-for="(o, i) in campaign.data.sectors[config.data.sector].cells[cIndex].stars" :key="i">
                <s-star
                  v-if="show.star(o)"
                  v-model="campaign.data.sectors[config.data.sector].cells[cIndex].stars[i]"
                  controls
                  @move="campaign.moveStar(i, { sector: config.data.sector, cell: cIndex }, $event)"
                />
              </div>
            </div>

            <div
              v-if="
                ((searchText && !applyFilters) || (applyFilters && filters.includes(fOpts.Planets))) &&
                iIndex === fOpts.Planets &&
                item.length > 0
              "
            >
              <div v-for="(o, i) in campaign.data.sectors[config.data.sector].cells[cIndex].planets" :key="i">
                <s-planet
                  v-if="show.planet(o)"
                  v-model="campaign.data.sectors[config.data.sector].cells[cIndex].planets[i]"
                  controls
                  @move="campaign.movePlanet(i, { sector: config.data.sector, cell: cIndex }, $event)"
                />
              </div>
            </div>

            <div
              v-if="
                ((searchText && !applyFilters) || (applyFilters && filters.includes(fOpts.Settlements))) &&
                iIndex === fOpts.Settlements &&
                item.length > 0
              "
            >
              <div v-for="(o, i) in campaign.data.sectors[config.data.sector].cells[cIndex].settlements" :key="i">
                <s-settlement
                  v-if="show.settlement(o)"
                  v-model="campaign.data.sectors[config.data.sector].cells[cIndex].settlements[i]"
                  controls
                  @move="campaign.moveSettlement(i, { sector: config.data.sector, cell: cIndex }, $event)"
                />
              </div>
            </div>

            <div
              v-if="
                ((searchText && !applyFilters) || (applyFilters && filters.includes(fOpts.Ships))) &&
                iIndex === fOpts.Ships &&
                item.length > 0
              "
            >
              <div v-for="(o, i) in campaign.data.sectors[config.data.sector].cells[cIndex].ships" :key="i">
                <s-starship
                  v-if="show.ship(o)"
                  v-model="campaign.data.sectors[config.data.sector].cells[cIndex].ships[i]"
                  controls
                  @move="campaign.moveStarship(i, { sector: config.data.sector, cell: cIndex }, $event)"
                />
              </div>
            </div>

            <div
              v-if="
                ((searchText && !applyFilters) || (applyFilters && filters.includes(fOpts.NPCs))) &&
                iIndex === fOpts.NPCs &&
                item.length > 0
              "
            >
              <div v-for="(o, i) in campaign.data.sectors[config.data.sector].cells[cIndex].npcs" :key="i">
                <s-NPC
                  v-if="show.npc(o)"
                  v-model="campaign.data.sectors[config.data.sector].cells[cIndex].npcs[i]"
                  controls
                  @move="campaign.moveNPC(i, { sector: config.data.sector, cell: cIndex }, $event)"
                />
              </div>
            </div>

            <div
              v-if="
                ((searchText && !applyFilters) || (applyFilters && filters.includes(fOpts.Creatures))) &&
                iIndex === fOpts.Creatures &&
                item.length > 0
              "
            >
              <div v-for="(o, i) in campaign.data.sectors[config.data.sector].cells[cIndex].creatures" :key="i">
                <s-creature
                  v-if="show.creature(o)"
                  v-model="campaign.data.sectors[config.data.sector].cells[cIndex].creatures[i]"
                  controls
                  @move="campaign.moveCreature(i, { sector: config.data.sector, cell: cIndex }, $event)"
                />
              </div>
            </div>

            <div
              v-if="
                ((searchText && !applyFilters) || (applyFilters && filters.includes(fOpts.Derelicts))) &&
                iIndex === fOpts.Derelicts &&
                item.length > 0
              "
            >
              <div v-for="(o, i) in campaign.data.sectors[config.data.sector].cells[cIndex].derelicts" :key="i">
                <s-derelict
                  v-if="show.derelict(o)"
                  v-model="campaign.data.sectors[config.data.sector].cells[cIndex].derelicts[i]"
                  controls
                  @move="campaign.moveDerelict(i, { sector: config.data.sector, cell: cIndex }, $event)"
                />
              </div>
            </div>

            <div
              v-if="
                ((searchText && !applyFilters) || (applyFilters && filters.includes(fOpts.Vaults))) &&
                iIndex === fOpts.Vaults &&
                item.length > 0
              "
            >
              <div v-for="(o, i) in campaign.data.sectors[config.data.sector].cells[cIndex].vaults" :key="i">
                <s-vault
                  v-if="show.vault(o)"
                  v-model="campaign.data.sectors[config.data.sector].cells[cIndex].vaults[i]"
                  controls
                  @move="campaign.moveVault(i, { sector: config.data.sector, cell: cIndex }, $event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  ERegion,
  ICreature,
  IDerelict,
  INPC,
  IPlanet,
  ISelectOpt,
  ISettlement,
  IStar,
  IStarship,
  IVault,
} from 'src/components/models';
import { NewCell, NewSector } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, computed, ref } from 'vue';

import IInput from 'src/components/IInput.vue';
import Cell from 'src/components/Sector/Cell.vue';
import SStar from 'src/components/Sector/SStar.vue';
import SPlanet from 'src/components/Sector/SPlanet.vue';
import SSettlement from 'src/components/Sector/SSettlement.vue';
import SStarship from 'src/components/Sector/SStarship.vue';
import SNPC from 'src/components/Sector/SNPC.vue';
import SCreature from 'src/components/Sector/SCreature.vue';
import SDerelict from 'src/components/Sector/SDerelict.vue';
import SVault from 'src/components/Sector/SVault.vue';
import HexMap2 from 'src/components/Sector/HexMap2.vue';
export default defineComponent({
  components: { IInput, Cell, SStar, SPlanet, SSettlement, SStarship, SNPC, SCreature, SDerelict, SVault, HexMap2 },
  name: 'Sector',
  setup() {
    const campaign = useCampaign();
    const config = useConfig();

    const sectorOpts = computed(() => {
      const out: ISelectOpt[] = [];
      campaign.data.sectors.forEach((s, i) => {
        out.push({
          label: s.name,
          value: i,
        });
      });
      return out;
    });

    const addSector = () => {
      campaign.data.sectors.push(NewSector());
      config.data.sector = campaign.data.sectors.length - 1;
    };
    const removeSector = () => {
      const d = config.data.sector;
      config.data.sector = 0;
      campaign.data.sectors.splice(d, 1);
    };

    const addCell = () => {
      campaign.data.sectors[config.data.sector].cells.unshift(NewCell());
    };
    const removeCell = (index: number) => {
      campaign.unlinkCell(campaign.data.sectors[config.data.sector].cells[index].id);
      campaign.data.sectors[config.data.sector].cells.splice(index, 1);
    };

    // Search stuff
    enum fOpts { // values need to match the keys in ISectorCell
      Stars = 'stars',
      Planets = 'planets',
      Settlements = 'settlements',
      Ships = 'ships',
      NPCs = 'npcs',
      Creatures = 'creatures',
      Derelicts = 'derelicts',
      Vaults = 'vaults',
    }
    const searchText = ref('');
    const filters = ref([] as fOpts[]);
    const applyFilters = computed((): boolean => {
      return filters.value != null && filters.value.length > 0;
    });

    const t = (s: string): boolean => {
      if (searchText.value === null) return true;
      return RegExp(searchText.value, 'i').test(s);
    };

    const show = {
      star: (o: IStar): boolean => {
        return t(o.name) || t(o.description);
      },
      planet: (o: IPlanet): boolean => {
        return t(o.name) || t(o.type) || t(o.description) || t(o.notes);
      },
      settlement: (o: ISettlement): boolean => {
        return t(o.name) || t(o.notes);
      },
      ship: (o: IStarship): boolean => {
        return t(o.name) || t(o.notes);
      },
      npc: (o: INPC): boolean => {
        if (t('bond') && o.bond) return true;
        return t(o.name) || t(o.role) || t(o.notes);
      },
      creature: (o: ICreature): boolean => {
        return t(o.name) || t(o.environment) || t(o.notes);
      },
      derelict: (o: IDerelict): boolean => {
        return t(o.name) || t(o.type) || t(o.notes);
      },
      vault: (o: IVault): boolean => {
        return t(o.name) || t(o.notes);
      },
    };

    return {
      campaign,
      config,
      ERegion,

      sectorOpts,

      addSector,
      addCell,

      removeSector,
      removeCell,

      searchText,
      filters,
      applyFilters,
      fOpts,
      show,
    };
  },
});
</script>
