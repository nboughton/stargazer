<template>
  <q-page padding>
    <!-- Vows -->
    <div class="text-h4 sf-header text-center q-mb-sm" id="vows">
      Vows<q-btn icon="add_circle" flat dense @click="addVow" />
    </div>
    <progress-track
      class="q-mb-md"
      v-for="(vow, vIndex) in campaign.data.character.vows"
      :key="vIndex"
      v-model="campaign.data.character.vows[vIndex]"
    >
      <template v-slot:action v-if="config.data.edit">
        <q-btn class="col-shrink" icon="delete" flat dense @click="removeVow(vIndex)" />
      </template>
    </progress-track>

    <q-separator />

    <!-- Progress -->
    <div class="text-h4 sf-header text-center q-mt-md q-mb-sm" id="progress">
      Progress<q-btn icon="add_circle" flat dense @click="addTrack" />
    </div>
    <progress-track
      class="q-mb-md"
      v-for="(track, pIndex) in campaign.data.progressTracks"
      :key="pIndex"
      v-model="campaign.data.progressTracks[pIndex]"
    >
      <template v-slot:action v-if="config.data.edit">
        <q-btn class="col-shrink" icon="delete" flat dense @click="removeTrack(pIndex)" />
      </template>
    </progress-track>

    <q-separator />

    <!-- Clocks -->
    <div class="text-h4 sf-header text-center q-mt-md q-mb-sm" id="clocks">
      Clocks<q-btn icon="add_circle" flat dense @click="addClock" />
    </div>
    <clocks class="q-mb-sm" all />
  </q-page>
</template>

<script lang="ts">
import { useCampaign } from 'src/store/campaign';
import { defineComponent } from 'vue';

import ProgressTrack from 'src/components/Tracks/ProgressTrack.vue';
import Clocks from 'src/components/Tracks/Clocks.vue';
import { NewClock, NewProgressTrack } from 'src/lib/campaign';
import { useConfig } from 'src/store/config';

export default defineComponent({
  name: 'Challenges',
  components: { ProgressTrack, Clocks },
  setup() {
    const campaign = useCampaign();
    const config = useConfig();

    const addVow = () => campaign.data.character.vows.unshift(NewProgressTrack());
    const removeVow = (index: number) => campaign.data.character.vows.splice(index, 1);

    const addTrack = () => campaign.data.progressTracks.unshift(NewProgressTrack());
    const removeTrack = (index: number) => campaign.data.progressTracks.splice(index, 1);

    const addClock = () => {
      if (!campaign.data.character.clocks) campaign.data.character.clocks = [];
      campaign.data.character.clocks.unshift(NewClock());
    };
    const removeClock = (index: number) => campaign.data.character.clocks.splice(index, 1);

    return {
      campaign,
      config,
      addVow,
      removeVow,
      addTrack,
      removeTrack,
      addClock,
      removeClock,
    };
  },
});
</script>
