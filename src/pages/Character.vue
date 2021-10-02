<template>
  <q-page padding>
    <!-- Name, pronouns, callsign etc -->
    <div class="row full-width items-center" id="top">
      <q-input class="col-grow" label="Name" v-model="campaign.data.character.name" dense />
      <q-input class="col-4" label="Pronouns" v-model="campaign.data.character.pronouns" dense />
    </div>
    <div class="row full-width items-center">
      <q-input class="col-xs-4 col-sm-3 col-2" label="Callsign" v-model="campaign.data.character.callsign" dense />
      <q-input class="col-grow" label="Characteristics" v-model="campaign.data.character.characteristics" dense />
    </div>

    <!-- Momentum -->
    <div class="row justify-between items-center" v-if="$q.screen.gt.xs">
      <span class="col-shrink text-bold q-mx-sm">Momentum</span>
      <resource-track class="col-grow" v-model="campaign.data.character.tracks.momentum" />
      <q-input
        class="col-xs-2 col-sm-1 col-1"
        label="Max"
        type="number"
        :max="10"
        :min="-6"
        v-model="campaign.data.character.tracks.momentum.max"
        dense
        borderless
      />
      <q-input
        class="col-xs-2 col-sm-1 col-1"
        label="Reset"
        type="number"
        :max="4"
        :min="0"
        v-model="campaign.data.character.tracks.momentum.reset"
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
          v-model="campaign.data.character.tracks.momentum.max"
          dense
          borderless
        />
        <q-input
          class="col-xs-2 col-sm-1 col-1"
          label="Reset"
          type="number"
          :max="4"
          :min="0"
          v-model="campaign.data.character.tracks.momentum.reset"
          dense
          borderless
        />
        <q-btn class="col-shrink" icon="mdi-fire" @click="burnMomentum" flat dense>
          <q-tooltip>Burn momentum</q-tooltip>
        </q-btn>
      </div>
      <resource-track class="row full-width" v-model="campaign.data.character.tracks.momentum" />
    </div>

    <q-separator />

    <!-- Tracks -->
    <div class="row justify-between items-center" v-if="$q.screen.gt.xs">
      <span class="col-shrink text-bold q-mx-sm">Health</span>
      <resource-track class="col-grow" v-model="campaign.data.character.tracks.health" />
      <q-separator vertical />

      <span class="col-shrink text-bold q-mx-sm">Spirit</span>
      <resource-track class="col-grow" v-model="campaign.data.character.tracks.spirit" />
      <q-separator vertical />

      <span class="col-shrink text-bold q-mx-sm">Supply</span>
      <resource-track class="col-grow" v-model="campaign.data.character.tracks.supply" />
    </div>
    <div v-else>
      <div class="row justify-between items-center">
        <span class="col-2 text-bold">Health</span>
        <resource-track class="col-grow" v-model="campaign.data.character.tracks.health" />
      </div>

      <div class="row justify-between items-center">
        <span class="col-2 text-bold">Spirit</span>
        <resource-track class="col-grow" v-model="campaign.data.character.tracks.spirit" />
      </div>

      <div class="row justify-between items-center">
        <span class="col-2 text-bold">Supply</span>
        <resource-track class="col-grow" v-model="campaign.data.character.tracks.supply" />
      </div>
    </div>

    <q-separator />

    <!-- Stats -->
    <stats class="q-mt-md" v-model="campaign.data.character.stats" />
    <i-input class="q-mt-md q-mb-md" label="Gear &amp; Notes" v-model="campaign.data.character.gear" autogrow />

    <q-separator />

    <!-- Assets -->
    <div class="text-h4 sf-header text-center q-mt-md q-mb-sm" id="assets">
      Assets<q-btn icon="add_circle" flat dense @click="showAssetSelect = true" />
    </div>

    <div class="row assets-container" v-if="$q.screen.gt.sm">
      <div class="col left-assets q-mr-xs">
        <div v-for="(a, i) in campaign.data.character.assets" :key="i">
          <asset class="q-mb-sm" v-if="i % 2 == 0" v-model="campaign.data.character.assets[i]">
            <template v-slot:append>
              <q-btn icon="delete" flat dense @click="removeAsset(i)" v-if="config.data.edit">
                <q-tooltip>Remove asset</q-tooltip>
              </q-btn>
            </template>
          </asset>
        </div>
      </div>

      <div class="col right-assets q-ml-xs">
        <div v-for="(a, i) in campaign.data.character.assets" :key="i">
          <asset class="q-mb-sm" v-if="i % 2 != 0" v-model="campaign.data.character.assets[i]">
            <template v-slot:append>
              <q-btn icon="delete" flat dense @click="removeAsset(i)" v-if="config.data.edit">
                <q-tooltip>Remove asset</q-tooltip>
              </q-btn>
            </template>
          </asset>
        </div>
      </div>
    </div>
    <div class="column assets-container" v-else>
      <div v-for="(a, i) in campaign.data.character.assets" :key="i">
        <asset class="q-mb-sm" v-model="campaign.data.character.assets[i]">
          <template v-slot:append>
            <q-btn icon="delete" flat dense @click="removeAsset(i)" v-if="config.data.edit">
              <q-tooltip>Remove asset</q-tooltip>
            </q-btn>
          </template>
        </asset>
      </div>
    </div>

    <q-separator />

    <!-- Legacy tracks -->
    <div class="text-h4 sf-header text-center q-mt-md q-mb-sm" id="legacies">Legacy Tracks</div>
    <legacy-track name="Quests" v-model="campaign.data.character.legacies.quests" />
    <q-separator />
    <legacy-track name="Bonds" v-model="campaign.data.character.legacies.bonds" />
    <q-separator />
    <legacy-track name="Discoveries" v-model="campaign.data.character.legacies.discoveries" />

    <q-separator />

    <div class="row">
      <!-- Impacts -->
      <div class="col-12 text-h4 sf-header text-center q-pt-md" id="impacts">Impacts</div>
      <div class="col-xs-6 col-sm-3 col-3" v-for="(set, setIndex) in campaign.data.character.impacts" :key="setIndex">
        <div class="text-bold">{{ setIndex }}</div>
        <q-checkbox
          class="row"
          v-for="(impact, iIndex) in campaign.data.character.impacts[setIndex]"
          :key="iIndex"
          :label="impact.name"
          v-model="campaign.data.character.impacts[setIndex][iIndex].marked"
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

import Stats from 'src/components/Stats.vue';
import Asset from 'src/components/Assets/Asset2.vue';
import Assets from 'src/components/Assets/Assets.vue';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';

import ResourceTrack from 'src/components/Tracks/ResourceTrack.vue';
import LegacyTrack from 'src/components/Tracks/LegacyTrack.vue';
import IInput from 'src/components/IInput.vue';

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
    const campaign = useCampaign();

    const removeAsset = (index: number) => campaign.data.character.assets.splice(index, 1);
    const showAssetSelect = ref(false);

    const markImpact = () => {
      let marked = 0;
      Object.values(campaign.data.character.impacts).forEach((set) => {
        set.forEach((impact) => {
          if (impact.marked) {
            marked++;
          }
        });
      });

      if (marked === 1) {
        campaign.data.character.tracks.momentum.reset = 1;
      } else if (marked > 1) {
        campaign.data.character.tracks.momentum.reset = 0;
      } else {
        campaign.data.character.tracks.momentum.reset = 2;
      }

      campaign.data.character.tracks.momentum.max = 10 - marked;
    };

    const burnMomentum = () => {
      const n = +campaign.data.character.tracks.momentum.reset;
      campaign.data.character.tracks.momentum.value = n;
    };

    const config = useConfig();

    return {
      campaign,

      removeAsset,
      showAssetSelect,

      markImpact,

      burnMomentum,
      config,
    };
  },
});
</script>
