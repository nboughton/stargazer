<template>
  <q-page padding>
    <!-- content -->
    <i-input class="q-mb-md" label="Campaign Name" v-model="campaign.data.name" />

    <q-expansion-item default-opened>
      <template v-slot:header>
        <div class="col sf-header text-h4 rounded-borders">
          Factions<q-btn icon="add_circle" flat dense @click="addFaction" />
        </div>
      </template>
      <faction
        v-for="(f, i) in campaign.data.factions"
        :key="i"
        v-model="campaign.data.factions[i]"
        @delete="removeFaction(i)"
      />
    </q-expansion-item>

    <q-expansion-item default-opened>
      <template v-slot:header>
        <div class="col sf-header text-h4 rounded-borders">Truths</div>
      </template>
      <truth label="Cataclysm" id="cataclysm" />
      <truth label="Exodus" id="exodus" />
      <truth label="Communities" id="communities" />
      <truth label="Iron" id="iron" />
      <truth label="Laws" id="laws" />
      <truth label="Religion" id="religion" />
      <truth label="Magic" id="magic" />
      <truth label="Communication and Data" id="communication" />
      <truth label="Medicine" id="medicine" />
      <truth label="Artificial Intelligence" id="ai" />
      <truth label="War" id="war" />
      <truth label="Lifeforms" id="lifeforms" />
      <truth label="Precursors" id="precursors" />
      <truth label="Horrors" id="horrors" />
    </q-expansion-item>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useCampaign } from 'src/store/campaign';

import { NewFaction } from 'src/lib/campaign';

import Truth from 'src/components/Truth.vue';
import IInput from 'src/components/Widgets/IInput.vue';
import Faction from 'src/components/Faction.vue';

export default defineComponent({
  name: 'Truths',
  components: { Truth, IInput, Faction },
  setup() {
    const campaign = useCampaign();

    const addFaction = () => {
      campaign.data.factions.unshift(NewFaction());
    };
    const removeFaction = (index: number) => {
      campaign.data.factions.splice(index, 1);
    };

    return {
      campaign,
      addFaction,
      removeFaction,
    };
  },
});
</script>
