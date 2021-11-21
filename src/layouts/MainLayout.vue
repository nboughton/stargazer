<template>
  <q-layout view="hHh lpR fFf" :class="{ crt: crt }">
    <q-header elevated class="bg-secondary text-white" height-hint="98">
      <q-toolbar :class="{ crt: crt }">
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />
        <!--q-avatar rounded>
          <img src="~/../../public/logo.png" />
        </q-avatar-->

        <q-toolbar-title class="sf-header text-h6">
          <!--q-input input-class="sf-header text-h5" v-model="campaign.data.name" borderless /-->
          IRON JOURNAL <span class="title-pipe">|</span> STARFORGED
        </q-toolbar-title>

        <q-btn v-if="config.data.saving" icon="save" flat dense disable />
        <q-btn icon="mdi-dice-6" flat dense @click="showRoller = !showRoller">
          <q-tooltip>Toggle Dice Roller</q-tooltip>
        </q-btn>

        <q-toggle icon="delete" v-model="config.data.edit">
          <q-tooltip>Toggle Delete buttons</q-tooltip>
        </q-toggle>

        <q-btn dense flat icon="edit_note" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="center" dense :class="{ crt: crt }">
        <q-route-tab to="/campaign" label="Campaign" />
        <q-route-tab to="/" :label="campaign.data.character.name" />
        <q-route-tab to="/challenges" label="Challenges" />
        <q-route-tab to="/sector" label="Sector" />
      </q-tabs>
    </q-header>

    <q-drawer elevated overlay v-model="leftDrawerOpen" side="left" bordered>
      <q-item clickable v-ripple v-if="!google.data.googleDriveLinked" @click="google.linkGoogleDrive">
        <q-item-section avatar>
          <q-icon name="link" />
        </q-item-section>
        <q-item-section>
          Link Google Drive
          <q-tooltip>Link your Google Drive account for cross-device play</q-tooltip>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple v-if="google.data.googleDriveLinked" @click="google.unlinkGoogleDrive">
        <q-item-section avatar>
          <q-icon name="link_off" />
        </q-item-section>
        <q-item-section>
          Unlink Google Drive
          <q-tooltip>Unlink your Google Drive account, disabling cross-device play</q-tooltip>
        </q-item-section>
      </q-item>

      <q-separator size="lg" />

      <!-- left drawer content -->
      <q-btn class="full-width" label="New Campaign" flat @click="addCampaign" icon-right="add" />
      <q-list>
        <q-item class="items-center" v-for="(item, index) in config.data.index" :key="index" clickable v-ripple>
          <q-item-section @click="config.data.current = item.id" class="row full-width no-wrap">
            {{ item.name }}
          </q-item-section>
          <q-item-section class="col-shrink" v-if="config.data.index.length > 1 && config.data.edit">
            <q-btn
              icon="delete"
              flat
              dense
              @click="
                campaignToDelete = item.id;
                showCampaignDelete = true;
              "
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator size="lg" />

      <q-list class="text-primary">
        <q-item clickable v-ripple @click="campaign.exportData">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            Export Campaign Data
            <q-tooltip>Download your current campaign database as a .json file</q-tooltip>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showDataLoad = true">
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>
          <q-item-section>
            Load Campaign Data
            <q-tooltip>Load a previously exported campaign database</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator size="lg" />

        <q-item clickable v-ripple @click="customAssets.exportData">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            Export Custom Assets
            <q-tooltip>Download your custom Assets as a .json file</q-tooltip>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showAssetLoad = true">
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>
          <q-item-section>
            Load Custom Assets
            <q-tooltip>Load a custom Assets file</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator size="lg" />

        <q-item clickable v-ripple @click="campaign.exportJournal">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            Export Journal
            <q-tooltip>Export Journal as HTML</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator size="lg" />

        <q-item clickable v-ripple @click="showAbout = true">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            About
            <q-tooltip>About this app</q-tooltip>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      id="rightDrawer"
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      :width="width"
      bordered
      :class="{ crt: crt }"
    >
      <!-- right drawer content -->
      <div class="row">
        <q-expansion-item class="col-12">
          <template v-slot:header>
            <div class="text-h4 sf-header col-grow">ORACLES</div>
          </template>
          <oracles class="q-pl-sm q-pr-sm" />
        </q-expansion-item>
      </div>

      <div class="row">
        <q-expansion-item class="col-12">
          <template v-slot:header>
            <div class="text-h4 sf-header col-grow">MOVES</div>
          </template>
          <moves class="q-pl-sm q-pr-sm" />
        </q-expansion-item>
      </div>

      <journal />

      <q-btn
        class="journal-to-top"
        fab
        color="primary"
        @click="scrollTo('rightDrawer')"
        icon="mdi-arrow-up"
        size="sm"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showDataLoad">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary"> Load Character Database </q-card-section>

        <q-card-section class="text-subtitle">
          Please bear in mind that this data will overwrite any existing versions of the same Campaigns
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="fileToLoad"
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            label="Select File"
            accept=".json"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="load" color="primary" @click="loadData" flat />
          <q-btn label="close" color="warning" @click="showDataLoad = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAssetLoad">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary"> Load Custom Assets </q-card-section>

        <q-card-section class="text-subtitle text-center">
          <q-avatar icon="warning" size="xl" color="warning" />
          <div class="text-justify">
            Warning: loading user supplied asset data can be risky. Stargazer attempts to strip any potentially
            malicious code (i.e script tags in asset items) but cannot absolutely guarantee the safety of any data
            loaded. Please check over the contents of the Asset file before loading it. And always ensure you only load
            data from sources you trust.
          </div>
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="assetsToLoad"
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            label="Select File"
            accept=".json"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="load" color="primary" @click="loadAssetData" flat />
          <q-btn label="close" color="warning" @click="showAssetLoad = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAbout">
      <q-card class="card-bg">
        <q-card-section class="row bg-secondary text-h5 justify-between">
          <div class="col-grow sf-header">About</div>
          <q-btn class="col-shrink" flat dense icon="close" @click="showAbout = false" />
        </q-card-section>

        <q-card-section class="about-text text-justify">
          <div class="q-my-sm">
            Ironsworn: Starforged is &copy;
            <a href="https://www.ironswornrpg.com">Shawn Tomkin</a>
          </div>

          <div class="q-my-sm">
            Iron Journal: Stargazer is &copy;
            <a href="https://twitter.com/tiberianpun">Nick Boughton</a>
          </div>

          <div class="q-my-sm">
            With many thanks to
            <a href="https://twitter.com/r_sek">rsek</a> for the amazing
            <a href="https://github.com/rsek/dataforged">Dataforged repository</a> and all their contributions to
            Stargazer's development. This app could not have been made without them.
          </div>

          <div class="q-my-sm">
            Made with icons from <a href="https://game-icons.net/">game-icons.net</a> by
            <a href="https://lorcblog.blogspot.com/">Lorc</a> and <a href="https://delapouite.com/">Delapouite</a>
          </div>

          <div class="q-my-sm">
            If you like this app and want to say thanks you can
            <a href="https://ko-fi.com/tiberianpun">buy me a coffee</a>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showCampaignDelete">
      <q-card>
        <q-card-section class="row card-bg text-h6">
          <div class="col-grow">Delete Campaign?</div>
          <q-btn class="col-shrink" flat dense icon="close" @click="showCampaignDelete = false" />
        </q-card-section>

        <q-card-section class="text-h6 text-center"> Are you sure? </q-card-section>

        <q-card-actions align="center">
          <q-btn color="warning" label="DELETE" @click="removeCampaign(campaignToDelete)" />
          <q-btn color="primary" label="NOPE" @click="showCampaignDelete = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <roller v-model="showRoller" :btnSize="btnSize" />
  </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';

import { useGoogle } from 'src/store/google';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { useAssets } from 'src/store/assets';
import { useQuasar, scroll } from 'quasar';

import Oracles from 'src/components/Oracles/Oracles.vue';
import Moves from 'src/components/Moves.vue';
import Roller from 'src/components/Roller.vue';
import Journal from 'src/components/Journal/Journal.vue';

export default defineComponent({
  components: { Oracles, Moves, Roller, Journal },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const google = useGoogle();
    const campaign = useCampaign();
    const config = useConfig();
    const $q = useQuasar();

    const addCampaign = () => campaign.new();
    const removeCampaign = (id: string) => campaign.delete(id);
    const campaignToDelete = ref('');
    const showCampaignDelete = ref(false);

    const fileToLoad = ref(null);
    const showDataLoad = ref(false);
    const loadData = async () => {
      const f: File = fileToLoad.value as unknown as File;
      await campaign.loadData(f);
      showDataLoad.value = false;
    };

    const customAssets = useAssets();
    const assetsToLoad = ref(null);
    const showAssetLoad = ref(false);
    const loadAssetData = async () => {
      const f: File = assetsToLoad.value as unknown as File;
      await customAssets.loadData(f);
      showAssetLoad.value = false;
    };

    const width = computed((): number => {
      return $q.screen.lt.sm || $q.platform.is.mobile
        ? Math.floor($q.screen.width * 0.9)
        : Math.floor($q.screen.width * 0.4);
    });
    const btnSize = computed((): string => {
      return $q.screen.lt.sm ? 'sm' : 'md';
    });

    const showRoller = ref(false);
    const showAbout = ref(false);
    const crt = computed((): boolean => {
      return /bebop/i.test(campaign.data.sectors[config.data.sector].name);
    });

    const { getScrollTarget, setVerticalScrollPosition } = scroll;
    const scrollTo = (id: string) => {
      const el = document.getElementById(id);
      if (el !== null) {
        const target = getScrollTarget(el);
        const offset = el.offsetTop;
        const duration = 200;
        setVerticalScrollPosition(target, offset, duration);
      }
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      width,

      google,

      campaign,
      config,
      customAssets,

      addCampaign,
      removeCampaign,
      showCampaignDelete,
      campaignToDelete,

      showDataLoad,
      fileToLoad,
      loadData,

      showAssetLoad,
      assetsToLoad,
      loadAssetData,

      showRoller,
      showAbout,
      btnSize,
      crt,
      scrollTo,
    };
  },
});
</script>

<style lang="sass">
.about-text a
  color: $primary

.about-text a:visited
    color: $primary

.journal-to-top
  position: fixed
  bottom: 10px
  right: 10px

.title-pipe
  margin: 0
  padding: 0
  margin-left: 10px
  margin-right: 10px
  text-shadow: 1px 1px 1px $dark
  color: darkgrey
</style>
