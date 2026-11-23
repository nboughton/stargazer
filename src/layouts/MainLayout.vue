<template>
  <q-layout view="hHh lpR fFf" :class="{ crt: crt }">
    <q-header elevated class="bg-secondary text-white" height-hint="98">
      <q-toolbar :class="{ crt: crt }">
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="sf-header text-h6">
          IRON JOURNAL <span class="title-pipe">|</span> STARFORGED
        </q-toolbar-title>

        <q-btn v-if="config.data.saving" icon="save" flat dense disable />
        <q-btn icon="mdi-dice-6" flat dense @click="showRoller = !showRoller">
          <q-tooltip>{{ $t('nav.toggleRoller') }}</q-tooltip>
        </q-btn>

        <q-toggle icon="delete" v-model="config.data.edit">
          <q-tooltip>{{ $t('nav.toggleDelete') }}</q-tooltip>
        </q-toggle>

        <q-btn-toggle
          :model-value="activeLocale"
          @update:model-value="onLocaleChange"
          :options="localeToggleOptions"
          dense
          flat
          no-caps
          toggle-color="primary"
          data-testid="locale-switcher"
          :aria-label="$t('language.label')"
        >
          <q-tooltip>{{ $t('language.tooltip') }}</q-tooltip>
        </q-btn-toggle>

        <q-btn dense flat icon="edit_note" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="center" dense :class="{ crt: crt }">
        <q-route-tab to="/campaign" :label="$t('nav.campaign')" />
        <q-route-tab v-if="config.data.journalTab" to="/journal" :label="$t('nav.journal')" />
        <q-route-tab to="/" :label="campaign.data.character.name" />
        <q-route-tab to="/challenges" :label="$t('nav.challenges')" />
        <q-route-tab to="/sector" :label="$t('nav.sector')" />
      </q-tabs>
    </q-header>

    <q-drawer elevated overlay v-model="leftDrawerOpen" side="left" bordered>
      <!-- left drawer content -->
      <q-btn class="full-width" :label="$t('nav.newCampaign')" flat @click="addCampaign" icon-right="add" />
      <q-list>
        <q-item
          class="items-center"
          v-for="(item, index) in config.data.index.sort((a, b) => (a.name || '').localeCompare(b.name))"
          :key="index"
          :active="item.id == campaign.data?.id"
          clickable
          v-ripple
        >
          <q-item-section @click="config.data.current = item.id" class="row full-width no-wrap">
            {{ formatCampaignIndexName(item.name) }}
          </q-item-section>
          <q-item-section class="col-shrink" v-if="config.data.index.length > 1 && config.data.edit">
            <q-btn
              icon="delete"
              flat
              dense
              @click="
                campaignToDelete = item.id;
                campaignToDeleteName = item.name;
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
            {{ $t('nav.exportCampaign') }}
            <q-tooltip>{{ $t('nav.exportCampaignTip') }}</q-tooltip>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showDataLoad = true">
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>
          <q-item-section>
            {{ $t('nav.loadCampaign') }}
            <q-tooltip>{{ $t('nav.loadCampaignTip') }}</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator size="lg" />

        <q-item clickable v-ripple @click="customAssets.exportData">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            {{ $t('nav.exportCustomAssets') }}
            <q-tooltip>{{ $t('nav.exportCustomAssetsTip') }}</q-tooltip>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showAssetLoad = true">
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>
          <q-item-section>
            {{ $t('nav.loadCustomAssets') }}
            <q-tooltip>{{ $t('nav.loadCustomAssetsTip') }}</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator size="lg" />

        <q-item clickable v-ripple @click="customOracles.exportData">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            {{ $t('nav.exportCustomOracles') }}
            <q-tooltip>{{ $t('nav.exportCustomOraclesTip') }}</q-tooltip>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="showOracleLoad = true">
          <q-item-section avatar>
            <q-icon name="upload" />
          </q-item-section>
          <q-item-section>
            {{ $t('nav.loadCustomOracles') }}
            <q-tooltip>{{ $t('nav.loadCustomOraclesTip') }}</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator size="lg" />

        <q-item clickable v-ripple @click="campaign.exportJournal">
          <q-item-section avatar>
            <q-icon name="download" />
          </q-item-section>
          <q-item-section>
            {{ $t('nav.exportJournal') }}
            <q-tooltip>{{ $t('nav.exportJournalTip') }}</q-tooltip>
          </q-item-section>
        </q-item>

        <q-separator size="lg" />

        <q-item>
          <q-item-section avatar>
            <q-toggle v-model="config.data.journalTab" :label="$t('nav.useJournalTab')" />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="translate" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('language.label') }}</q-item-label>
            <q-btn-toggle
              class="q-mt-xs"
              :model-value="activeLocale"
              @update:model-value="onLocaleChange"
              :options="localeToggleOptions"
              dense
              unelevated
              no-caps
              toggle-color="primary"
              data-testid="locale-toggle"
            />
          </q-item-section>
        </q-item>

        <q-separator size="lg" />

        <q-item clickable v-ripple @click="showAbout = true">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            {{ $t('nav.about') }}
            <q-tooltip>{{ $t('nav.aboutTip') }}</q-tooltip>
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
        <q-expansion-item class="col-12" id="oracles">
          <template v-slot:header>
            <div class="text-h4 sf-header col-grow">{{ $t('nav.oraclesHeader') }}</div>
          </template>
          <oracles class="q-pl-sm q-pr-sm" />
        </q-expansion-item>
      </div>

      <div class="row">
        <q-expansion-item class="col-12" id="moves">
          <template v-slot:header>
            <div class="text-h4 sf-header col-grow">{{ $t('nav.movesHeader') }}</div>
          </template>
          <moves class="q-pl-sm q-pr-sm" />
        </q-expansion-item>
      </div>

      <div id="journal" />
      <journal v-if="!config.data.journalTab" />

      <q-fab color="primary" icon="keyboard_arrow_left" direction="left" class="journal-to-top">
        <q-fab-action color="primary" @click="scrollTo('oracles')" icon="mdi-dice-multiple">
          <q-tooltip>{{ $t('nav.scrollToOracles') }}</q-tooltip>
        </q-fab-action>
        <q-fab-action color="primary" @click="scrollTo('moves')" icon="mdi-file-document-multiple">
          <q-tooltip>{{ $t('nav.scrollToMoves') }}</q-tooltip>
        </q-fab-action>
        <q-fab-action v-if="!config.data.journalTab" color="primary" @click="scrollTo('journal')" icon="mdi-notebook">
          <q-tooltip>{{ $t('nav.scrollToJournal') }}</q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showDataLoad" :maximized="$q.platform.is.mobile">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary"> {{ $t('nav.loadCharDbTitle') }} </q-card-section>

        <q-card-section class="text-subtitle">
          {{ $t('nav.loadCharDbWarn') }}
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="fileToLoad"
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            :label="$t('common.selectFile')"
            accept=".json"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn :label="$t('common.loadLower')" color="primary" @click="loadData" flat />
          <q-btn :label="$t('common.closeLower')" color="warning" @click="showDataLoad = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAssetLoad" :maximized="$q.platform.is.mobile">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary"> {{ $t('nav.loadCustomAssets') }} </q-card-section>

        <q-card-section class="text-subtitle text-center">
          <q-avatar icon="warning" size="xl" color="warning" />
          <div class="text-justify">
            {{ $t('nav.loadCustomAssetsWarn') }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="assetsToLoad"
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            :label="$t('common.selectFile')"
            accept=".json"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn :label="$t('common.loadLower')" color="primary" @click="loadAssetData" flat />
          <q-btn :label="$t('common.closeLower')" color="warning" @click="showAssetLoad = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showOracleLoad" :maximized="$q.platform.is.mobile">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary"> {{ $t('nav.loadCustomOracles') }} </q-card-section>

        <q-card-section class="text-subtitle text-center">
          <q-avatar icon="warning" size="xl" color="warning" />
          <div class="text-justify">
            {{ $t('nav.loadCustomOraclesWarn') }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="oraclesToLoad"
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            :label="$t('common.selectFile')"
            accept=".json"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn :label="$t('common.loadLower')" color="primary" @click="loadOracleData" flat />
          <q-btn :label="$t('common.closeLower')" color="warning" @click="showOracleLoad = false" flat />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAbout" :maximized="$q.platform.is.mobile">
      <q-card class="card-bg">
        <q-card-section class="row bg-secondary text-h5 justify-between">
          <div class="col-grow sf-header">{{ $t('nav.about') }}</div>
          <q-btn class="col-shrink" flat dense icon="close" @click="showAbout = false" />
        </q-card-section>

        <q-card-section class="about-text text-justify">
          <div class="q-my-sm">
            {{ $t('nav.aboutCopyrightSf') }}
            <a href="https://www.ironswornrpg.com">Shawn Tomkin</a>
          </div>

          <div class="q-my-sm">
            {{ $t('nav.aboutCopyrightSg') }}
            <a href="https://twitter.com/tiberianpun">Nick Boughton</a>
          </div>

          <div class="q-my-sm">
            {{ $t('nav.aboutPlanetTokens') }} <a href="https://joshmeehanart.com/">Joshua Meehan</a>.
          </div>

          <div class="q-my-sm">
            {{ $t('nav.aboutThanksPrefix') }}
            <a href="https://twitter.com/r_sek">rsek</a> {{ $t('nav.aboutThanksMid') }}
            <a href="https://github.com/rsek/dataforged">{{ $t('nav.aboutThanksRepo') }}</a>
            {{ $t('nav.aboutThanksSuffix') }}
          </div>

          <div class="q-my-sm">
            {{ $t('nav.aboutIconsPrefix') }} <a href="https://game-icons.net/">game-icons.net</a>
            {{ $t('nav.aboutIconsBy') }}
            <a href="https://lorcblog.blogspot.com/">Lorc</a> {{ $t('nav.aboutAnd') }}
            <a href="https://delapouite.com/">Delapouite</a>
          </div>

          <div class="q-my-sm">
            {{ $t('nav.aboutCoffeePrefix') }}
            <a href="https://ko-fi.com/tiberianpun">{{ $t('nav.aboutCoffeeLink') }}</a>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showCampaignDelete" :maximized="$q.platform.is.mobile">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary"> {{ $t('nav.deleteCampaignTitle') }} </q-card-section>
        <q-card-section class="text-h6 text-center"> {{ $t('common.warning') }}</q-card-section>
        <q-card-section class="text-subtitle">
          <p>{{ $t('nav.deleteCampaignWarn') }}</p>
          <q-card-section class="text-h6 text-center">
            {{ $t('nav.deleteCampaignPrompt', { name: campaignToDeleteName }) }}
          </q-card-section>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            color="warning"
            :label="$t('common.deleteUpper')"
            @click="
              removeCampaign(campaignToDelete).then(() => {
                showCampaignDelete = false;
              })
            "
          />
          <q-btn color="primary" :label="$t('common.doNotDelete')" @click="showCampaignDelete = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <roller v-model="showRoller" :btnSize="btnSize" />
  </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { AppLocale, isAppLocale } from 'src/components/models';
import { setLocale } from 'src/lib/locale';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { useAssets } from 'src/store/assets';
import { useQuasar, scroll } from 'quasar';

import Oracles from 'src/components/Oracles/Oracles.vue';
import Moves from 'src/components/Moves/Moves.vue';
import Roller from 'src/components/Widgets/Roller.vue';
import Journal from 'src/components/Journal/Journal.vue';
import { useOracles } from 'src/store/oracles';

export default defineComponent({
  components: { Oracles, Moves, Roller, Journal },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const campaign = useCampaign();
    const config = useConfig();
    const $q = useQuasar();

    const addCampaign = () => campaign.new();
    const removeCampaign = (id: string) => campaign.delete(id);
    const campaignToDelete = ref('');
    const campaignToDeleteName = ref('');
    const showCampaignDelete = ref(false);

    const fileToLoad = ref(null);
    const showDataLoad = ref(false);
    const loadData = () => {
      const f: File = fileToLoad.value as unknown as File;
      campaign.loadData(f);
      showDataLoad.value = false;
    };

    const customAssets = useAssets();
    const assetsToLoad = ref(null);
    const showAssetLoad = ref(false);
    const loadAssetData = () => {
      const f: File = assetsToLoad.value as unknown as File;
      customAssets.loadData(f);
      showAssetLoad.value = false;
    };

    const customOracles = useOracles();
    const oraclesToLoad = ref(null);
    const showOracleLoad = ref(false);
    const loadOracleData = () => {
      const f: File = oraclesToLoad.value as unknown as File;
      customOracles.loadData(f);
      showOracleLoad.value = false;
    };

    const width = computed((): number => {
      return !$q.platform.is.ipad && ($q.screen.lt.sm || $q.platform.is.mobile)
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

    const { t } = useI18n();
    const localeToggleOptions = computed((): Array<{ label: string; value: AppLocale }> => [
      { label: t('language.shortEn'), value: 'en-US' },
      { label: t('language.shortPt'), value: 'pt-BR' },
    ]);
    const localeMenuOptions = computed((): Array<{ label: string; value: AppLocale }> => [
      { label: t('language.enUS'), value: 'en-US' },
      { label: t('language.ptBR'), value: 'pt-BR' },
    ]);
    const activeLocale = computed<AppLocale>(() =>
      isAppLocale(config.data.locale) ? config.data.locale : 'en-US'
    );
    const onLocaleChange = (val: unknown): void => {
      if (isAppLocale(val)) {
        setLocale(val);
      }
    };
    const formatCampaignIndexName = (name?: string): string => {
      if (!name) return t('nav.unnamedCampaign');
      const prefix = t('campaign.defaults.newCampaignPrefix');
      return name.replace(/^(New Campaign|Nova Campanha)(?=\s*-\s*)/, prefix);
    };

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

      campaign,
      config,
      customAssets,
      customOracles,

      addCampaign,
      removeCampaign,
      showCampaignDelete,
      campaignToDelete,
      campaignToDeleteName,

      showDataLoad,
      fileToLoad,
      loadData,

      showAssetLoad,
      assetsToLoad,
      loadAssetData,

      showOracleLoad,
      oraclesToLoad,
      loadOracleData,

      showRoller,
      showAbout,
      btnSize,
      crt,
      scrollTo,
      localeToggleOptions,
      localeMenuOptions,
      activeLocale,
      onLocaleChange,
      formatCampaignIndexName,
    };
  },
});
</script>

<style lang="sass">
#rightDrawer
  padding-bottom: 80px

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
