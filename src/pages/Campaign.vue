<template>
  <q-page padding>
    <!-- content -->
    <i-input class="q-mb-md" :label="$t('campaign.name')" v-model="campaign.data.name" />

    <q-expansion-item default-opened>
      <template v-slot:header>
        <div class="col sf-header text-h4 rounded-borders">
          {{ $t('campaign.factions') }}<q-btn icon="add_circle" flat dense @click="addFaction" />
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
        <div class="col sf-header text-h4 rounded-borders">{{ $t('campaign.truths') }}</div>
      </template>
      <truth label="Cataclysm" truthId="Starforged/Setting_Truths/Cataclysm" id="cataclysm" />
      <truth label="Exodus" truthId="Starforged/Setting_Truths/Exodus" id="exodus" />
      <truth label="Communities" truthId="Starforged/Setting_Truths/Communities" id="communities" />
      <truth label="Iron" truthId="Starforged/Setting_Truths/Iron" id="iron" />
      <truth label="Laws" truthId="Starforged/Setting_Truths/Laws" id="laws" />
      <truth label="Religion" truthId="Starforged/Setting_Truths/Religion" id="religion" />
      <truth label="Magic" truthId="Starforged/Setting_Truths/Magic" id="magic" />
      <truth label="Communication and Data" truthId="Starforged/Setting_Truths/Communication_and_Data" id="communication" />
      <truth label="Medicine" truthId="Starforged/Setting_Truths/Medicine" id="medicine" />
      <truth label="Artificial Intelligence" truthId="Starforged/Setting_Truths/Artificial_Intelligence" id="ai" />
      <truth label="War" truthId="Starforged/Setting_Truths/War" id="war" />
      <truth label="Lifeforms" truthId="Starforged/Setting_Truths/Lifeforms" id="lifeforms" />
      <truth label="Precursors" truthId="Starforged/Setting_Truths/Precursors" id="precursors" />
      <truth label="Horrors" truthId="Starforged/Setting_Truths/Horrors" id="horrors" />
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
