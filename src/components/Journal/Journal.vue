<template>
  <div class="row full-width items-center q-pl-md q-pr-sm q-mt-sm">
    <span class="col-shrink text-h4 q-pr-sm sf-header">JOURNAL</span>
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
        <q-btn class="col-shrink" icon="add_circle" flat dense @click="addJournal">
          <q-tooltip>Add a journal entry</q-tooltip>
        </q-btn>
      </template>

      <template v-slot:prepend>
        <q-icon name="search" />
      </template>

      <template v-slot:after>
        <q-btn icon="sort" flat dense @click="journalSortByTitle">
          <q-tooltip>Sort journal entries by title</q-tooltip>
        </q-btn>
      </template>
    </q-input>
  </div>

  <!-- Pinned -->
  <div v-for="(journal, index) in campaign.data[campaign.charId].journal" :key="index">
    <journal-entry
      v-if="journal.pinned"
      :index="index"
      open
      @imgUpload="
        journalEntryID = index;
        imageToLoad = null;
        showImageLoad = true;
      "
      @remove="removeJournal(index)"
    />
  </div>

  <!-- Not pinned -->
  <div v-for="(journal, index) in campaign.data[campaign.charId].journal" :key="index">
    <journal-entry
      v-if="showJournal(journal) && !journal.pinned"
      :index="index"
      :open="index === 0"
      @imgUpload="
        journalEntryID = index;
        imageToLoad = null;
        showImageLoad = true;
      "
      @remove="removeJournal(index)"
    />
  </div>

  <q-dialog v-model="showImageLoad" :maximized="$q.platform.is.mobile">
    <q-card class="card-bg">
      <q-card-section class="text-center text-bold bg-secondary">Upload Image</q-card-section>

      <q-card-section>
        <q-file
          v-model="imageToLoad"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          label="Select Image"
          accept="image/*"
        />
      </q-card-section>

      <q-card-section>
        <q-select
          label="Float"
          v-model="imageFloatSelect"
          :options="Object.values(imageFloat)"
          dense
          hint="Select image float (allows text to wrap around the image)"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn label="Save" flat color="primary" @click="loadImage" />
        <q-btn label="Close" flat color="warning" dense @click="showImageLoad = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import { defineComponent, ref } from 'vue';

import { IJournalEntry } from '../models';

import { useCampaign } from 'src/store/campaign';
import { useQuasar } from 'quasar';

import { NewJournal } from 'src/lib/campaign';

import JournalEntry from 'src/components/Journal/JournalEntry.vue';

export default defineComponent({
  name: 'Journal',
  components: { JournalEntry },
  setup() {
    const campaign = useCampaign();

    const addJournal = () => campaign.data[campaign.charId].journal.unshift(NewJournal());
    const removeJournal = (index: number) => {
      if (window.confirm('Are you sure you want to delete this entry?'))
        campaign.data[campaign.charId].journal.splice(index, 1);
    };

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

    const $q = useQuasar();
    const journalSortByTitle = () =>
      $q
        .dialog({
          title: 'Confirm',
          message: 'This will re-order your journal entries and cannot be undone. Are you sure?',
          cancel: true,
        })
        .onOk(() =>
          campaign.data[campaign.charId].journal.sort((a: IJournalEntry, b: IJournalEntry) =>
            b.title.localeCompare(a.title)
          )
        );

    enum imageFloat {
      Left = 'left',
      Right = 'right',
      None = 'none',
    }
    const imageFloatSelect = ref(imageFloat.None);
    const imageToLoad = ref(null);
    const journalEntryID = ref(0);
    const showImageLoad = ref(false);
    const loadImage = () => {
      const f: File = imageToLoad.value as unknown as File;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = ev.target?.result;
        let imgClass = 'journal-img';
        if (imageFloatSelect.value === imageFloat.Left) {
          imgClass += ' float-left';
        }
        if (imageFloatSelect.value === imageFloat.Right) {
          imgClass += ' float-right';
        }
        campaign.appendToJournal(journalEntryID.value, `<img class="${imgClass}" src="${img as string}" />`);
      };

      reader.readAsDataURL(f);
      showImageLoad.value = false;
    };

    return {
      showJournal,
      addJournal,
      removeJournal,
      journalSortByTitle,
      loadImage,
      showImageLoad,
      imageFloat,
      imageToLoad,
      imageFloatSelect,
      journalEntryID,
      filter,
      campaign,
    };
  },
});
</script>

<style lang="sass">
.journal-img
  max-width: 100%
  max-height: 300px
  margin: 5px

.float-left
  float: left
  clear: right

.float-right
  float: right
  clear: left
</style>
