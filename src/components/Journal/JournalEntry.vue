<template>
  <q-expansion-item class="q-px-sm" header-class="q-py-none q-px-none" :default-opened="open" expand-icon-toggle>
    <template v-slot:header>
      <div class="row full-width items-center">
        <i-input class="col-grow q-mr-sm" label="Title" v-model="app.ca.journal[index].title" />
        <q-btn class="col-shrink" flat dense :icon="pinIcon(index)" @click="pin(index)" />
        <q-btn class="col-shrink" v-if="app.config.edit" flat dense icon="delete" @click="$emit('remove')">
          <q-tooltip>Delete this journal entry</q-tooltip>
        </q-btn>
      </div>
    </template>

    <q-editor
      placeholder="Content"
      v-model="app.ca.journal[index].content"
      :definitions="{
        image: {
          tip: 'Upload an image',
          icon: 'add_photo_alternate',
          handler: () => $emit('imgUpload'),
        },
      }"
      :toolbar="[
        [
          {
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify'],
          },
        ],
        ['ordered', 'unordered'],
        ['bold', 'italic', 'strike', 'underline'],
        ['undo', 'redo'],
        ['image'],
      ]"
      dense
    />
    <div class="q-pb-sm" />
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useCampaign } from 'src/store/campaign';

import IInput from 'src/components/Widgets/IInput.vue';

export default defineComponent({
  name: 'JournalEntry',
  components: { IInput },
  props: {
    index: {
      type: Number,
      required: true,
    },
    open: {
      type: Boolean,
    },
  },
  emits: ['remove', 'imgUpload'],
  setup() {
    const app = useCampaign();

    const pinIcon = (index: number): string => {
      return app.ca.journal[index].pinned ? 'mdi-pin' : 'mdi-pin-off';
    };
    const pin = (index: number) => {
      app.ca.journal[index].pinned = !app.ca.journal[index].pinned;
    };

    return {
      app,
      pinIcon,
      pin,
    };
  },
});
</script>
