<template>
  <q-page padding>
    <!-- Vows -->
    <div class="text-h4 sf-header text-center q-mb-sm" id="vows">
      Vows<q-btn icon="add_circle" flat dense @click="addVow" />
    </div>
    <progress-track class="q-mb-md" v-for="(vow, vIndex) in app.ch.vows" :key="vIndex" v-model="app.ch.vows[vIndex]">
      <template v-slot:action v-if="app.config.edit">
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
      v-for="(track, pIndex) in app.ca.progressTracks"
      :key="pIndex"
      v-model="app.ca.progressTracks[pIndex]"
    >
      <template v-slot:action v-if="app.config.edit">
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
    const app = useCampaign();

    const addVow = () => app.ch.vows.unshift(NewProgressTrack());
    const removeVow = (index: number) => app.ch.vows.splice(index, 1);

    const addTrack = () => app.ca.progressTracks.unshift(NewProgressTrack());
    const removeTrack = (index: number) => app.ca.progressTracks.splice(index, 1);

    const addClock = () => {
      if (!app.ca.clocks) app.ca.clocks = [];
      app.ca.clocks.unshift(NewClock());
    };
    const removeClock = (index: number) => app.ca.clocks.splice(index, 1);

    return {
      app,
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
