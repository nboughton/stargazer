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
      <hex-map />
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
    </div>

    <div class="column q-mt-md">
      <!--Raw: {{ results }}-->
      <div v-if="results != {}">
        <div class="q-mb-lg" v-for="(sector, sID) in results" :key="sID">
          <!--Sector: {{ campaign.data.sectors[+sID].name }}-->
          <div class="row sf-header text-h4">Sector: {{ campaign.data.sectors[+sID].name }}</div>

          <q-card class="q-mb-md" v-for="(cell, cID) in sector" :key="cID">
            <!--Cell: {{ campaign.data.sectors[+sID].cells[cID].name }}-->
            <q-card-section class="row my-card sf-header text-h5"
              >Cell: {{ campaign.data.sectors[+sID].cells[cID].name }}</q-card-section
            >
            <q-card-section class="q-pa-none" v-for="(itemIDs, oType) in cell" :key="oType">
              <!--{{ oType }}: {{ itemIDs }}-->
              <div v-for="oID in itemIDs" :key="oID">
                <!--{{ campaign.data.sectors[+sID].cells[cID][oType][+oID].name }}-->
                <div v-if="oType === fOpts.Settlements">
                  <s-settlement v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === fOpts.NPCs">
                  <s-NPC v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === fOpts.Stars">
                  <s-star v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === fOpts.Planets">
                  <s-planet v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === fOpts.Ships">
                  <s-starship v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === fOpts.Derelicts">
                  <s-derelict v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === fOpts.Vaults">
                  <s-vault v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === fOpts.Creatures">
                  <s-creature v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  ERegion,
  ECellStatus,
  ICreature,
  IDerelict,
  INPC,
  IPlanet,
  ISelectOpt,
  ISettlement,
  IStar,
  IStarship,
  IVault,
  ISearchResults,
} from 'src/components/models';
import { NewSector } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, computed, ref } from 'vue';

import IInput from 'src/components/IInput.vue';
/*
import Cell from 'src/components/Sector/Cell.vue';
*/
import SSettlement from 'src/components/Sector/SSettlement.vue';
import SNPC from 'src/components/Sector/SNPC.vue';
import SStar from 'src/components/Sector/SStar.vue';
import SPlanet from 'src/components/Sector/SPlanet.vue';
import SStarship from 'src/components/Sector/SStarship.vue';
import SDerelict from 'src/components/Sector/SDerelict.vue';
import SVault from 'src/components/Sector/SVault.vue';
import SCreature from 'src/components/Sector/SCreature.vue';

import HexMap from 'src/components/Sector/HexMap.vue';
export default defineComponent({
  components: { IInput, HexMap, SSettlement, SNPC, SStar, SPlanet, SStarship, SDerelict, SCreature, SVault },
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

    const results = computed((): ISearchResults => {
      const res = <ISearchResults>{};
      const ensureData = (sector: number, cell: string, oType: string) => {
        if (!res[sector]) res[sector] = {};
        if (!res[sector][cell]) res[sector][cell] = {};
        if (!res[sector][cell][oType]) res[sector][cell][oType] = [];
      };

      // Do nothing if filters and search text are empty
      if (!searchText.value && (!filters.value || filters.value.length === 0)) return res;

      // Construct results
      campaign.data.sectors.forEach((sector, sectorI) => {
        Object.keys(sector.cells).forEach((cellI) => {
          Object.values(fOpts).forEach((oType) => {
            for (let i = 0; i < sector.cells[cellI][oType].length; i++) {
              if (sector.cells[cellI].stat === ECellStatus.Location) {
                switch (oType) {
                  case fOpts.Stars:
                    if (show.star(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case fOpts.Planets:
                    if (show.planet(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case fOpts.Settlements:
                    if (show.settlement(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case fOpts.Ships:
                    if (show.ship(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case fOpts.NPCs:
                    if (show.npc(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case fOpts.Creatures:
                    if (show.creature(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case fOpts.Derelicts:
                    if (show.derelict(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case fOpts.Vaults:
                    if (show.vault(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  default:
                    break;
                }
              }
            }
          });
        });
      });

      return res;
    });

    const show = {
      star: (o: IStar): boolean => {
        if (applyFilters.value && !filters.value.includes(fOpts.Stars)) return false;
        return t(o.name) || t(o.description);
      },
      planet: (o: IPlanet): boolean => {
        if (applyFilters.value && !filters.value.includes(fOpts.Planets)) return false;
        return t(o.name) || t(o.type) || t(o.description) || t(o.notes);
      },
      settlement: (o: ISettlement): boolean => {
        if (applyFilters.value && !filters.value.includes(fOpts.Settlements)) return false;
        return t(o.name) || t(o.notes);
      },
      ship: (o: IStarship): boolean => {
        if (applyFilters.value && !filters.value.includes(fOpts.Ships)) return false;
        return t(o.name) || t(o.notes);
      },
      npc: (o: INPC): boolean => {
        if (applyFilters.value && !filters.value.includes(fOpts.NPCs)) return false;
        return (t('bond') && o.bond) || t(o.name) || t(o.role) || t(o.notes);
      },
      creature: (o: ICreature): boolean => {
        if (applyFilters.value && !filters.value.includes(fOpts.Creatures)) return false;
        return t(o.name) || t(o.environment) || t(o.notes);
      },
      derelict: (o: IDerelict): boolean => {
        if (applyFilters.value && !filters.value.includes(fOpts.Derelicts)) return false;
        return t(o.name) || t(o.type) || t(o.notes);
      },
      vault: (o: IVault): boolean => {
        if (applyFilters.value && !filters.value.includes(fOpts.Vaults)) return false;
        return t(o.name) || t(o.notes);
      },
    };

    return {
      campaign,
      config,
      ERegion,
      ECellStatus,

      sectorOpts,

      addSector,
      // addCell,

      removeSector,
      // removeCell,

      searchText,
      filters,
      applyFilters,
      fOpts,
      results,
    };
  },
});
</script>
