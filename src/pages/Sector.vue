<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-sm q-mb-md" v-if="$q.screen.gt.xs">
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
    <div v-else>
      <div class="row q-mb-sm">
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
      </div>
      <div class="row q-gutter-sm q-mb-sm">
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
    </div>

    <div class="row justify-center q-mb-sm">
      <hex-map :searchResults="results" />
    </div>

    <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
      <i-input class="col" label="Sector name" v-model="campaign.data.sectors[config.data.sector].name" />
      <i-input class="col" label="Search" v-model="searchText" clearable />
      <q-select
        class="col"
        label="Filters"
        v-model="filters"
        :options="Object.values(ESectorOpts)"
        multiple
        clearable
        standout="bg-blue-grey text-white"
        :input-style="{ color: '#ECEFF4' }"
        dense
      />
    </div>
    <div v-else>
      <div class="row q-mb-sm">
        <i-input class="col" label="Sector name" v-model="campaign.data.sectors[config.data.sector].name" />
      </div>
      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" label="Search" v-model="searchText" clearable />
        <q-select
          class="col"
          label="Filters"
          v-model="filters"
          :options="Object.values(ESectorOpts)"
          multiple
          clearable
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
      </div>
    </div>

    <div class="column q-mt-md">
      <!--Raw: {{ results }}-->
      <div v-if="results != {}">
        <div class="q-mb-lg" v-for="(sector, sID) in results" :key="sID">
          <div class="row sf-header text-h4">Sector: {{ campaign.data.sectors[+sID].name }}</div>

          <q-card class="q-mb-md" v-for="(cell, cID) in sector" :key="cID">
            <q-card-section class="row my-card sf-header text-h5"
              >Cell: {{ CellLabel(campaign.data.sectors[+sID].cells[cID]) }}</q-card-section
            >
            <q-card-section class="q-pa-none" v-for="(itemIDs, oType) in cell" :key="oType">
              <div v-for="oID in itemIDs" :key="oID">
                <div v-if="oType === ESectorOpts.Settlements">
                  <s-settlement v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === ESectorOpts.NPCs">
                  <s-NPC v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === ESectorOpts.Stars">
                  <s-star v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === ESectorOpts.Planets">
                  <s-planet v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === ESectorOpts.Ships">
                  <s-starship v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === ESectorOpts.Derelicts">
                  <s-derelict v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === ESectorOpts.Vaults">
                  <s-vault v-model="campaign.data.sectors[+sID].cells[cID][oType][+oID]" />
                </div>

                <div v-if="oType === ESectorOpts.Creatures">
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
  ESectorOpts,
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
import { CellLabel } from 'src/lib/campaign';
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

    const searchText = ref('');
    const filters = ref([] as ESectorOpts[]);
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
      // if (!searchText.value && (!filters.value || filters.value.length === 0)) return res;

      // Construct results
      campaign.data.sectors.forEach((sector, sectorI) => {
        Object.keys(sector.cells).forEach((cellI) => {
          Object.values(ESectorOpts).forEach((oType) => {
            for (let i = 0; i < sector.cells[cellI][oType].length; i++) {
              if (sector.cells[cellI].stat === ECellStatus.Location) {
                switch (oType) {
                  case ESectorOpts.Stars:
                    if (show.star(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case ESectorOpts.Planets:
                    if (show.planet(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case ESectorOpts.Settlements:
                    if (show.settlement(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case ESectorOpts.Ships:
                    if (show.ship(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case ESectorOpts.NPCs:
                    if (show.npc(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case ESectorOpts.Creatures:
                    if (show.creature(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case ESectorOpts.Derelicts:
                    if (show.derelict(sector.cells[cellI][oType][i])) {
                      ensureData(sectorI, cellI, oType);
                      res[sectorI][cellI][oType].push(i);
                    }
                    break;

                  case ESectorOpts.Vaults:
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
        if (applyFilters.value && !filters.value.includes(ESectorOpts.Stars)) return false;
        return t(o.name) || t(o.description);
      },
      planet: (o: IPlanet): boolean => {
        if (applyFilters.value && !filters.value.includes(ESectorOpts.Planets)) return false;
        return t(o.name) || t(o.type) || t(o.description) || t(o.notes);
      },
      settlement: (o: ISettlement): boolean => {
        if (applyFilters.value && !filters.value.includes(ESectorOpts.Settlements)) return false;
        return t(o.name) || t(o.notes);
      },
      ship: (o: IStarship): boolean => {
        if (applyFilters.value && !filters.value.includes(ESectorOpts.Ships)) return false;
        return t(o.name) || t(o.notes);
      },
      npc: (o: INPC): boolean => {
        if (applyFilters.value && !filters.value.includes(ESectorOpts.NPCs)) return false;
        return (t('bond') && o.bond) || t(o.name) || t(o.role) || t(o.notes);
      },
      creature: (o: ICreature): boolean => {
        if (applyFilters.value && !filters.value.includes(ESectorOpts.Creatures)) return false;
        return t(o.name) || t(o.environment) || t(o.notes);
      },
      derelict: (o: IDerelict): boolean => {
        if (applyFilters.value && !filters.value.includes(ESectorOpts.Derelicts)) return false;
        return t(o.name) || t(o.type) || t(o.notes);
      },
      vault: (o: IVault): boolean => {
        if (applyFilters.value && !filters.value.includes(ESectorOpts.Vaults)) return false;
        return t(o.name) || t(o.notes);
      },
    };

    return {
      campaign,
      config,
      ERegion,
      ECellStatus,
      CellLabel,

      sectorOpts,

      addSector,
      // addCell,

      removeSector,
      // removeCell,

      searchText,
      filters,
      applyFilters,
      ESectorOpts,
      results,
    };
  },
});
</script>
