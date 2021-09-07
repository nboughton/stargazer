<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-sm q-mb-md">
      <q-btn class="col-shrink" flat dense icon="add_circle" @click="addSector" />
      <q-select class="col" label="Sector" v-model="config.data.sector" :options="sectorOpts" map-options emit-value standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense />
      <q-btn v-if="campaign.data.sectors.length > 1 && config.data.edit" class="col-shrink" flat dense icon="delete" @click="removeSector" />
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
    <!--div class="row">some kind of hex grid</div-->
    <div class="row justify-center">
      <q-btn icon="add" label="New Location" outline @click="addCell" />
    </div>
    <div class="column q-mt-md">
      <cell class="q-mb-md" v-for="(cell, index) in campaign.data.sectors[config.data.sector].cells" :key="index" :sectorID="config.data.sector" :cellID="index" @delete="removeCell(index)" />
    </div>
  </q-page>
</template>

<script lang="ts">
import IInput from 'src/components/IInput.vue';
import { ERegion, ISelectOpt } from 'src/components/models';
import Cell from 'src/components/Sector/Cell.vue';
import { NewCell, NewSector } from 'src/lib/campaign';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, computed } from 'vue';
export default defineComponent({
  components: { IInput, Cell },
  name: 'Sector',
  setup() {
    const campaign = useCampaign();
    const config = useConfig();
    const addCell = () => {
      campaign.data.sectors[config.data.sector].cells.push(NewCell());
    };
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

    const removeCell = (index: number) => {
      campaign.data.sectors[config.data.sector].cells.splice(index, 1);
    };

    return {
      campaign,
      config,
      addCell,
      ERegion,
      sectorOpts,
      addSector,
      removeSector,
      removeCell,
    };
  },
});
</script>
