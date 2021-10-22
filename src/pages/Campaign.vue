<template>
  <q-page padding>
    <!-- content -->
    <i-input class="q-mb-md" label="Campaign Name" v-model="campaign.data.name" />

    <div class="sf-header text-h4">Factions</div>
    <faction
      v-for="(f, i) in campaign.data.factions"
      :key="i"
      v-model="campaign.data.factions[i]"
      @delete="removeFaction(i)"
    />

    <div class="sf-header text-h4 q-mt-md">Truths</div>
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useCampaign } from 'src/store/campaign';

import Truth from 'src/components/Truth.vue';
import IInput from 'src/components/IInput.vue';
import Faction from 'src/components/Faction.vue';

export default defineComponent({
  name: 'Truths',
  components: { Truth, IInput, Faction },
  setup() {
    const campaign = useCampaign();

    const removeFaction = (index: number) => {
      campaign.data.factions.splice(index, 1);
    };

    return {
      campaign,
      removeFaction,
    };
  },
});
</script>
