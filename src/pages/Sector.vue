<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-sm q-mb-md" v-if="$q.screen.gt.xs">
      <q-btn class="col-shrink" flat dense icon="add_circle" @click="addSector" />
      <q-select
        class="col"
        label="Sector"
        v-model="campaign.config.sector"
        :options="sectorOpts"
        map-options
        emit-value
        standout="bg-blue-grey text-white"
        :input-style="{ color: '#ECEFF4' }"
        dense
      />
      <q-btn
        v-if="campaign.data[campaign.camId].sectors.length > 1 && campaign.config.edit"
        class="col-shrink"
        flat
        dense
        icon="delete"
        @click="removeSector"
      />
      <q-select
        class="col"
        label="Region"
        v-model="campaign.data[campaign.camId].sectors[campaign.config.sector].region"
        :options="Object.values(ERegion)"
        standout="bg-blue-grey text-white"
        :input-style="{ color: '#ECEFF4' }"
        dense
      />
      <i-input
        class="col"
        label="Faction/Control"
        v-model="campaign.data[campaign.camId].sectors[campaign.config.sector].control"
      />
    </div>
    <div v-else>
      <div class="row q-mb-sm">
        <q-btn class="col-shrink" flat dense icon="add_circle" @click="addSector" />
        <q-select
          class="col"
          label="Sector"
          v-model="campaign.config.sector"
          :options="sectorOpts"
          map-options
          emit-value
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn
          v-if="campaign.data[campaign.camId].sectors.length > 1 && campaign.config.edit"
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
          v-model="campaign.data[campaign.camId].sectors[campaign.config.sector].region"
          :options="Object.values(ERegion)"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <i-input
          class="col"
          label="Faction/Control"
          v-model="campaign.data[campaign.camId].sectors[campaign.config.sector].control"
        />
      </div>
    </div>

    <div class="row justify-center q-mb-sm">
      <hex-map :searchResults="results" />
    </div>

    <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
      <i-input
        class="col"
        label="Sector name"
        v-model="campaign.data[campaign.camId].sectors[campaign.config.sector].name"
      />
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
      <q-btn class="col-shrink" flat dense icon="mdi-cog" @click="showMapConfig = true" />
    </div>
    <div v-else>
      <div class="row q-gutter-sm q-mb-sm">
        <i-input
          class="col"
          label="Sector name"
          v-model="campaign.data[campaign.camId].sectors[campaign.config.sector].name"
        />
        <q-btn class="col-shrink" flat dense icon="mdi-cog" @click="showMapConfig = true" />
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
      <div v-if="results">
        <q-expansion-item class="q-mb-lg" v-for="(sector, sID) in results" :key="sID" default-opened>
          <template v-slot:header>
            <div class="text-h4 sf-header col-grow">Sector: {{ campaign.data[campaign.camId].sectors[+sID].name }}</div>
          </template>

          <i-input
            class="q-mb-sm"
            label="Sector Notes"
            v-model="campaign.data[campaign.camId].sectors[+sID].notes"
            autogrow
          />

          <q-expansion-item
            class="q-mb-md card-bg rounded-borders"
            flat
            v-for="(cell, cID) in sector"
            :key="cID"
            default-opened
          >
            <template v-slot:header>
              <div class="card-bg sf-header text-h5 q-pa-none col-grow">
                Cell: {{ CellLabel(campaign.data[campaign.camId].sectors[+sID].cells[cID], cID as string).label }}
              </div>
            </template>

            <div class="q-pt-xs" />
            <q-card-section class="q-px-xs q-py-none" v-for="(itemIDs, oType) in cell" :key="oType">
              <div v-for="oID in itemIDs" :key="oID">
                <div v-if="oType === ESectorOpts.Settlements">
                  <s-settlement
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.Settlements, sID, cID as string, oID)"
                  />
                </div>

                <div v-if="oType === ESectorOpts.NPCs">
                  <s-NPC
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.NPCs, sID, cID as string, oID)"
                  />
                </div>

                <div v-if="oType === ESectorOpts.Stars">
                  <s-star
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.Stars, sID, cID as string, oID)"
                  />
                </div>

                <div v-if="oType === ESectorOpts.Planets">
                  <s-planet
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.Planets, sID, cID as string, oID)"
                  />
                </div>

                <div v-if="oType === ESectorOpts.Ships">
                  <s-starship
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.Ships, sID, cID as string, oID)"
                  />
                </div>

                <div v-if="oType === ESectorOpts.Derelicts">
                  <s-derelict
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.Derelicts, sID, cID as string, oID)"
                  />
                </div>

                <div v-if="oType === ESectorOpts.Vaults">
                  <s-vault
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.Vaults, sID, cID as string, oID)"
                  />
                </div>

                <div v-if="oType === ESectorOpts.Creatures">
                  <s-creature
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.Creatures, sID, cID as string, oID)"
                  />
                </div>

                <div v-if="oType === ESectorOpts.Sightings">
                  <s-sighting
                    v-model="campaign.data[campaign.camId].sectors[+sID].cells[cID][oType][+oID]"
                    @delete="campaign.removeObject(ESectorOpts.Sightings, sID, cID as string, oID)"
                  />
                </div>
              </div>
            </q-card-section>
            <q-separator style="opacity: 0; padding: 0; margin: 0" size="1px" />
          </q-expansion-item>
        </q-expansion-item>
      </div>
    </div>

    <q-dialog v-model="showMapConfig">
      <q-card>
        <q-card-section class="card-bg row justify-between items-center text-h5 sf-header">
          <div class="sf-header col-grow">Options</div>
          <q-btn class="col-shrink" flat dense icon="close" @click="showMapConfig = false" />
        </q-card-section>

        <q-card-section>
          <q-toggle label="Stars" v-model="campaign.config.map.starfield" />
          <q-toggle label="Animations" v-model="campaign.config.map.animations" />
          <!--q-toggle label="Set passage as default" v-model="campaign.config.map.defaultPassage" /-->
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

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
  ISighting,
} from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import { NewSector, CellLabel } from 'src/lib/sector';

import IInput from 'src/components/Widgets/IInput.vue';
import SSettlement from 'src/components/Sector/SSettlement.vue';
import SNPC from 'src/components/Sector/SNPC.vue';
import SStar from 'src/components/Sector/SStar.vue';
import SPlanet from 'src/components/Sector/SPlanet.vue';
import SStarship from 'src/components/Sector/SStarship.vue';
import SDerelict from 'src/components/Sector/SDerelict.vue';
import SVault from 'src/components/Sector/SVault.vue';
import SCreature from 'src/components/Sector/SCreature.vue';
import SSighting from 'src/components/Sector/SSighting.vue';
import HexMap from 'src/components/Sector/HexMap.vue';

export default defineComponent({
  components: { IInput, HexMap, SSettlement, SNPC, SStar, SPlanet, SStarship, SDerelict, SCreature, SVault, SSighting },
  name: 'Sector',
  setup() {
    const campaign = useCampaign();
    const showMapConfig = ref(false);

    const sectorOpts = computed(() => {
      const out: ISelectOpt[] = [];
      campaign.data[campaign.camId].sectors.forEach((s, i) => {
        out.push({
          label: s.name,
          value: i,
        });
      });
      return out;
    });

    const addSector = () => {
      campaign.data[campaign.camId].sectors.push(NewSector());
      campaign.config.sector = campaign.data[campaign.camId].sectors.length - 1;
    };
    const removeSector = () => {
      const d = campaign.config.sector;
      campaign.config.sector = 0;
      campaign.data[campaign.camId].sectors.splice(d, 1);
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
      const res = {} as ISearchResults;
      const ensureData = (sector: number, cell: string, oType: string) => {
        if (!res[sector]) res[sector] = {};
        if (!res[sector][cell]) res[sector][cell] = {};
        if (!res[sector][cell][oType]) res[sector][cell][oType] = [];
      };

      // Construct results
      campaign.data[campaign.camId].sectors.forEach((sector, sectorI) => {
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

                  case ESectorOpts.Sightings:
                    if (show.sighting(sector.cells[cellI][oType][i])) {
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
      sighting: (o: ISighting): boolean => {
        if (applyFilters.value && !filters.value.includes(ESectorOpts.Sightings)) return false;
        return t(o.name) || t(o.notes);
      },
    };

    return {
      campaign,

      showMapConfig,
      ERegion,
      ECellStatus,
      CellLabel,

      sectorOpts,
      addSector,
      removeSector,

      searchText,
      filters,
      applyFilters,
      ESectorOpts,
      results,
    };
  },
});
</script>
