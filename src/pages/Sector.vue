<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-evenly q-mb-md">
      <i-input class="col" label="Sector" v-model="campaign.data.sectors[0].name" />
      <q-select class="col" label="Region" v-model="campaign.data.sectors[0].region" :options="Object.values(ERegion)" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense />
      <i-input class="col" label="Faction/Control" v-model="campaign.data.sectors[0].control" />
    </div>
    <!--div class="row">some kind of hex grid</div-->
    <div class="row justify-center">
      <q-btn icon="add" label="New Location" outline @click="addCell" />
    </div>
    <div class="column q-mt-md">
      <cell class="q-mb-md" v-for="(cell, index) in campaign.data.sectors[0].cells" :key="index" :sectorID="0" :cellID="index" />
    </div>
  </q-page>
</template>

<script lang="ts">
import IInput from 'src/components/IInput.vue';
import { ISectorCell, ERegion } from 'src/components/models';
import Cell from 'src/components/Sector/Cell.vue';
import { useCampaign } from 'src/store/campaign';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { IInput, Cell },
  name: 'Sector',
  setup() {
    const campaign = useCampaign();
    const addCell = () => {
      campaign.data.sectors[0].cells.push(<ISectorCell>{});
    };

    return {
      campaign,
      addCell,
      ERegion,
    };
  },
});
</script>
