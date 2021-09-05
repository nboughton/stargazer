<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-secondary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ campaign.data.name }}
        </q-toolbar-title>
        <q-btn icon="mdi-dice-6" flat dense @click="showRoller = !showRoller">
          <q-tooltip>Toggle Dice Roller</q-tooltip>
        </q-btn>
        <q-toggle icon="delete" v-model="config.data.edit">
          <q-tooltip>Toggle Delete buttons</q-tooltip>
        </q-toggle>
        <q-btn dense flat icon="edit_note" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="center" dense>
        <q-route-tab to="/tale" label="The Tale" />
        <q-route-tab to="/truths" label="Truths" />
        <q-route-tab to="/" :label="campaign.data.character.name" />
        <q-route-tab to="/sector" label="Sector" />
      </q-tabs>
    </q-header>

    <q-drawer elevated overlay v-model="leftDrawerOpen" side="left" bordered>
      <!-- left drawer content -->
      <q-btn
        class="full-width"
        label="New Campaign"
        flat
        @click="addCampaign"
        icon-right="add"
      />
      <q-list>
        <q-item
          class="items-center"
          v-for="(item, index) in config.data.index"
          :key="index"
          clickable
          v-ripple
        >
          <q-item-section
            @click="config.data.current = item.id"
            class="row full-width no-wrap"
          >
            {{ item.name }}
          </q-item-section>
          <q-item-section
            class="col-shrink"
            v-if="config.data.index.length > 1 && config.data.edit"
          >
            <q-btn icon="delete" flat dense @click="removeCampaign(item.id)" />
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
            <q-tooltip
              >Download your current campaign database as a .json
              file</q-tooltip
            >
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
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      :width="width"
      bordered
    >
      <!-- right drawer content -->
      <div class="row">
        <q-expansion-item class="col-12">
          <template v-slot:header>
            <div class="text-h4 custom-header col-grow">ORACLES</div>
          </template>
          <oracles class="q-pl-sm q-pr-sm" />
        </q-expansion-item>
      </div>

      <div class="row">
        <q-expansion-item class="col-12">
          <template v-slot:header>
            <div class="text-h4 custom-header col-grow">MOVES</div>
          </template>
          <moves class="q-pl-sm q-pr-sm" />
        </q-expansion-item>
      </div>

      <div class="row full-width items-center q-pl-md q-pr-sm q-mt-sm">
        <span class="col-shrink text-h4 custom-header q-pr-sm">JOURNAL</span>
        <q-input
          v-model="filter"
          class="col-grow q-mb-sm"
          dense
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          debounce="500"
          clearable
          label="Search by title or content"
        >
          <template v-slot:before>
            <q-btn
              class="col-shrink"
              icon="add_circle"
              flat
              dense
              @click="addJournal"
            >
              <q-tooltip>Add a journal entry</q-tooltip>
            </q-btn>
          </template>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div v-for="(journal, index) in campaign.data.journal" :key="index">
        <div class="q-pa-sm q-gutter-xs" v-if="showJournal(journal)">
          <div class="row">
            <q-input
              class="col-grow"
              label="Title"
              dense
              standout="bg-blue-grey text-white"
              :input-style="{ color: '#ECEFF4' }"
              debounce="750"
              v-model="campaign.data.journal[index].title"
            >
              <template v-slot:append v-if="config.data.edit">
                <q-btn
                  class="col-shrink q-pl-sm"
                  flat
                  dense
                  icon="delete"
                  @click="removeJournal(index)"
                >
                  <q-tooltip>Delete this journal entry</q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </div>
          <q-input
            class="row"
            label="Content"
            dense
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            autogrow
            debounce="750"
            v-model="campaign.data.journal[index].content"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showDataLoad">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary">
          Load Character Database
        </q-card-section>

        <q-card-section class="text-subtitle">
          Please bear in mind that this data will overwrite any existing
          versions of the same Campaigns
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="fileToLoad"
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            label="Select File"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="load" color="primary" @click="loadData" flat />
          <q-btn
            label="close"
            color="warning"
            @click="showDataLoad = false"
            flat
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAssetLoad">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary">
          Load Custom Assets
        </q-card-section>

        <q-card-section class="text-subtitle text-center">
          <q-icon name="warning" size="xl" color="warning" />
          <div class="text-justify">
            Warning: loading user supplied asset data can be risky. Stargazer
            attempts to strip any potentially malicious code (i.e script tags in
            asset items) but cannot absolutely guarantee the safety of any data
            loaded. Please check over the contents of the Asset file before
            loading it. And always ensure you only load data from sources you
            trust.
          </div>
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="assetsToLoad"
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            label="Select File"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="load" color="primary" @click="loadAssetData" flat />
          <q-btn
            label="close"
            color="warning"
            @click="showAssetLoad = false"
            flat
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAbout">
      <q-card class="my-card">
        <q-card-section class="row bg-secondary text-h6 justify-between">
          <div class="col-grow">About</div>
          <q-btn
            class="col-shrink"
            flat
            dense
            icon="close"
            @click="showAbout = false"
          />
        </q-card-section>

        <q-card-section class="about-text text-justify">
          <div class="q-my-sm">
            Ironsworn and Ironsworn Delve are &copy;
            <a href="https://www.ironswornrpg.com">Shawn Tomkin</a>
          </div>
          <div class="q-my-sm">
            Code &copy;
            <a href="https://twitter.com/tiberianpun">Nick Boughton</a>, 2021
          </div>
          <div class="q-my-sm">
            If you like this app and want to say thanks you can
            <a href="https://ko-fi.com/tiberianpun">buy me a coffee</a>
          </div>
          <div class="q-my-sm">
            With extra thanks to
            <a href="https://twitter.com/r_sek">rsek</a> for the amazing
            <a href="https://github.com/rsek/datasworn">Datasworn repository</a>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <roller v-model="showRoller" :btnSize="btnSize" />
  </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { useQuasar } from 'quasar';
import { NewJournal } from 'src/lib/campaign';
import { IJournalEntry } from 'src/components/models';
import Oracles from 'src/components/Oracles/Oracles.vue';
import Moves from 'src/components/Moves.vue';
import Roller from 'src/components/Roller.vue';
import { useAssets } from 'src/store/assets';

export default defineComponent({
  components: { Oracles, Moves, Roller },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const campaign = useCampaign();
    const config = useConfig();

    const addCampaign = () => campaign.new();
    const removeCampaign = (id: string) => campaign.delete(id);

    const addJournal = () => campaign.data.journal.unshift(NewJournal());
    const removeJournal = (index: number) =>
      campaign.data.journal.splice(index, 1);

    const filter = ref('');
    const showJournal = (journal: IJournalEntry): boolean => {
      if (filter.value === '' || filter.value === null) {
        return true;
      }

      if (journal.title !== undefined) {
        if (RegExp(filter.value, 'i').test(journal.title)) {
          return true;
        }
      }

      if (journal.content !== undefined) {
        if (RegExp(filter.value, 'i').test(journal.content)) {
          return true;
        }
      }
      return false;
    };

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

    const $q = useQuasar();
    const width = computed((): number => {
      if ($q.screen.lt.sm) {
        return Math.floor($q.screen.width * 0.9);
      }
      return Math.floor($q.screen.width * 0.4);
    });
    const btnSize = computed((): string => {
      if ($q.screen.lt.sm) {
        return 'sm';
      }
      return 'md';
    });

    const showRoller = ref(false);
    const showAbout = ref(false);

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

      addCampaign,
      removeCampaign,

      addJournal,
      removeJournal,
      showJournal,
      filter,

      showDataLoad,
      fileToLoad,
      loadData,

      showAssetLoad,
      assetsToLoad,
      loadAssetData,

      showRoller,
      showAbout,
      btnSize,
    };
  },
});
</script>

<style lang="sass">
.about-text a
  color: $primary

.about-text a:visited
    color: $primary
</style>
