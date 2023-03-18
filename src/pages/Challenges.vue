<template>
  <q-page padding>
    <!-- Vows -->
    <div class="text-h4 sf-header text-center q-mb-sm" id="vows">
      Vows<q-btn icon="add_circle" flat dense @click="addVow" />
    </div>
    <progress-track
      class="q-mb-md"
      v-for="(vow, vIndex) in campaign.data[campaign.camId].character[campaign.charId].vows"
      :key="vIndex"
      v-model="campaign.data[campaign.camId].character[campaign.charId].vows[vIndex]"
    >
      <template v-slot:action v-if="campaign.config.edit">
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
      v-for="(track, pIndex) in campaign.data[campaign.camId].progressTracks"
      :key="pIndex"
      v-model="campaign.data[campaign.camId].progressTracks[pIndex]"
    >
      <template v-slot:action v-if="campaign.config.edit">
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
import { NewClock, NewProgressTrack } from 'src/lib/tracks';

export default defineComponent({
  name: 'Challenges',
  components: { ProgressTrack, Clocks },
  setup() {
    const campaign = useCampaign();

    const addVow = () => campaign.data[campaign.camId].character[campaign.charId].vows.unshift(NewProgressTrack());
    const removeVow = (index: number) => campaign.data[campaign.camId].character[campaign.charId].vows.splice(index, 1);

    const addTrack = () => campaign.data[campaign.camId].progressTracks.unshift(NewProgressTrack());
    const removeTrack = (index: number) => campaign.data[campaign.camId].progressTracks.splice(index, 1);

    const addClock = () => {
      if (!campaign.data[campaign.camId].clocks) campaign.data[campaign.camId].clocks = [];
      campaign.data[campaign.camId].clocks.unshift(NewClock());
    };
    const removeClock = (index: number) => campaign.data[campaign.camId].clocks.splice(index, 1);

    return {
      campaign,
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
