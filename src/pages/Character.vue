<template>
  <q-page padding>
    <!-- Name, pronouns, callsign etc -->
    <div class="row full-width items-center" id="top">
      <q-input class="col-grow" label="Name" v-model="app.ch.name" dense />
      <q-input class="col-4" label="Pronouns" v-model="app.ch.pronouns" dense />
    </div>
    <div class="row full-width items-center">
      <q-input class="col-xs-4 col-sm-3 col-2" label="Callsign" v-model="app.ch.callsign" dense />
      <q-input class="col-grow" label="Characteristics" v-model="app.ch.characteristics" dense />
    </div>

    <!-- Momentum -->
    <div class="row justify-between items-center" v-if="$q.screen.gt.xs">
      <span class="col-shrink text-bold q-mx-sm">Momentum</span>
      <resource-track class="col-grow" v-model="app.ch.tracks.momentum" />
      <q-input
        class="col-xs-2 col-sm-1 col-1"
        label="Max"
        type="number"
        :max="10"
        :min="-6"
        v-model="app.ch.tracks.momentum.max"
        dense
        borderless
      />
      <q-input
        class="col-xs-2 col-sm-1 col-1"
        label="Reset"
        type="number"
        :max="4"
        :min="0"
        v-model="app.ch.tracks.momentum.reset"
        dense
        borderless
      />
      <q-btn class="col-shrink" icon="mdi-fire" @click="burnMomentum" flat dense>
        <q-tooltip>Burn momentum</q-tooltip>
      </q-btn>
    </div>
    <div v-else>
      <div class="row items-center">
        <span class="col-grow text-h6">Momentum</span>
        <q-input
          class="col-xs-2 col-sm-1 col-1"
          label="Max"
          type="number"
          :max="10"
          :min="-6"
          v-model="app.ch.tracks.momentum.max"
          dense
          borderless
        />
        <q-input
          class="col-xs-2 col-sm-1 col-1"
          label="Reset"
          type="number"
          :max="4"
          :min="0"
          v-model="app.ch.tracks.momentum.reset"
          dense
          borderless
        />
        <q-btn class="col-shrink" icon="mdi-fire" @click="burnMomentum" flat dense>
          <q-tooltip>Burn momentum</q-tooltip>
        </q-btn>
      </div>
      <resource-track class="row full-width" v-model="app.ch.tracks.momentum" />
    </div>

    <q-separator />

    <!-- Tracks -->
    <div class="row justify-between items-center" v-if="$q.screen.gt.xs">
      <span class="col-shrink text-bold q-mx-sm">Health</span>
      <resource-track class="col-grow" v-model="app.ch.tracks.health" />
      <q-separator vertical />

      <span class="col-shrink text-bold q-mx-sm">Spirit</span>
      <resource-track class="col-grow" v-model="app.ch.tracks.spirit" />
      <q-separator vertical />

      <span class="col-shrink text-bold q-mx-sm">Supply</span>
      <resource-track class="col-grow" v-model="app.ch.tracks.supply" />
    </div>
    <div v-else>
      <div class="row justify-between items-center">
        <span class="col-2 text-bold">Health</span>
        <resource-track class="col-grow" v-model="app.ch.tracks.health" />
      </div>

      <div class="row justify-between items-center">
        <span class="col-2 text-bold">Spirit</span>
        <resource-track class="col-grow" v-model="app.ch.tracks.spirit" />
      </div>

      <div class="row justify-between items-center">
        <span class="col-2 text-bold">Supply</span>
        <resource-track class="col-grow" v-model="app.ch.tracks.supply" />
      </div>
    </div>

    <q-separator />

    <!-- Stats -->
    <stats class="q-mt-md" v-model="app.ch.stats" />
    <i-input class="q-mt-md q-mb-md" label="Gear &amp; Notes" v-model="app.ch.gear" autogrow />

    <q-separator />

    <!-- Assets -->
    <div class="text-h4 sf-header text-center q-mt-md q-mb-sm" id="assets">
      Assets<q-btn icon="add_circle" flat dense @click="showAssetSelect = true" />
    </div>

    <div class="row assets-container" v-if="$q.screen.gt.sm">
      <div class="col left-assets q-mr-xs">
        <div v-for="(a, i) in app.ch.assets" :key="i">
          <asset class="q-mb-sm" v-if="i % 2 == 0" v-model="app.ch.assets[i]">
            <template v-slot:append>
              <q-btn icon="delete" flat dense @click="removeAsset(i)" v-if="app.config.edit">
                <q-tooltip>Remove asset</q-tooltip>
              </q-btn>
            </template>
          </asset>
        </div>
      </div>

      <div class="col right-assets q-ml-xs">
        <div v-for="(a, i) in app.ch.assets" :key="i">
          <asset class="q-mb-sm" v-if="i % 2 != 0" v-model="app.ch.assets[i]">
            <template v-slot:append>
              <q-btn icon="delete" flat dense @click="removeAsset(i)" v-if="app.config.edit">
                <q-tooltip>Remove asset</q-tooltip>
              </q-btn>
            </template>
          </asset>
        </div>
      </div>
    </div>
    <div class="column assets-container" v-else>
      <div v-for="(a, i) in app.ch.assets" :key="i">
        <asset class="q-mb-sm" v-model="app.ch.assets[i]">
          <template v-slot:append>
            <q-btn icon="delete" flat dense @click="removeAsset(i)" v-if="app.config.edit">
              <q-tooltip>Remove asset</q-tooltip>
            </q-btn>
          </template>
        </asset>
      </div>
    </div>

    <q-separator />

    <!-- Legacy tracks -->
    <div class="text-h4 sf-header text-center q-mt-md q-mb-sm" id="legacies">Legacy Tracks</div>
    <legacy-track name="Quests" v-model="app.ch.legacies.quests" />
    <q-separator />
    <legacy-track name="Bonds" v-model="app.ch.legacies.bonds" />
    <q-separator />
    <legacy-track name="Discoveries" v-model="app.ch.legacies.discoveries" />

    <q-separator />

    <div class="row">
      <!-- Impacts -->
      <div class="col-12 text-h4 sf-header text-center q-pt-md" id="impacts">Impacts</div>
      <div class="col-xs-6 col-sm-3 col-3" v-for="(set, setIndex) in app.ch.impacts" :key="setIndex">
        <div class="text-bold">{{ setIndex }}</div>
        <q-checkbox
          class="row"
          v-for="(impact, iIndex) in app.ch.impacts[setIndex]"
          :key="iIndex"
          :label="impact.name"
          v-model="app.ch.impacts[setIndex][iIndex].marked"
          @click="markImpact"
        >
        </q-checkbox>
      </div>
    </div>

    <assets v-model="showAssetSelect" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useCampaign } from 'src/store/campaign';

import Stats from 'src/components/Stats/Stats.vue';
import Asset from 'src/components/Assets/Asset.vue';
import Assets from 'src/components/Assets/Assets.vue';
import ResourceTrack from 'src/components/Tracks/ResourceTrack.vue';
import LegacyTrack from 'src/components/Tracks/LegacyTrack.vue';
import IInput from 'src/components/Widgets/IInput.vue';

export default defineComponent({
  name: 'Character',
  components: {
    LegacyTrack,
    ResourceTrack,
    Stats,
    Asset,
    Assets,
    IInput,
  },
  setup() {
    const app = useCampaign();

    const removeAsset = (index: number) => app.ch.assets.splice(index, 1);
    const showAssetSelect = ref(false);

    const markImpact = () => {
      let marked = 0;
      Object.values(app.ch.impacts).forEach((set) => {
        set.forEach((impact) => {
          if (impact.marked) {
            marked++;
          }
        });
      });

      if (marked === 1) {
        app.ch.tracks.momentum.reset = 1;
      } else if (marked > 1) {
        app.ch.tracks.momentum.reset = 0;
      } else {
        app.ch.tracks.momentum.reset = 2;
      }

      app.ch.tracks.momentum.max = 10 - marked;
    };

    const burnMomentum = () => {
      const n = +app.ch.tracks.momentum.reset;
      app.ch.tracks.momentum.value = n;
    };

    return {
      app,

      removeAsset,
      showAssetSelect,

      markImpact,

      burnMomentum,
    };
  },
});
</script>
