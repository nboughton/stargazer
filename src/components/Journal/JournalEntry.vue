<template>
  <q-expansion-item class="q-px-sm" header-class="q-py-none q-px-none" :default-opened="open" expand-icon-toggle>
    <template v-slot:header>
      <div class="row full-width items-center">
        <i-input class="col-grow q-mr-sm" label="Title" v-model="campaign.data.journal[index].title" />
        <q-btn class="col-shrink" flat dense :icon="pinIcon(index)" @click="pin(index)" />
        <q-btn class="col-shrink" v-if="config.data.edit" flat dense icon="delete" @click="$emit('remove')">
          <q-tooltip>Delete this journal entry</q-tooltip>
        </q-btn>
      </div>
    </template>

    <q-editor
      placeholder="Content"
      v-model="campaign.data.journal[index].content"
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
import { useConfig } from 'src/store/config';

import IInput from 'src/components/IInput.vue';

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
    const campaign = useCampaign();
    const config = useConfig();

    const pinIcon = (index: number): string => {
      return campaign.data.journal[index].pinned ? 'mdi-pin' : 'mdi-pin-off';
    };
    const pin = (index: number) => {
      campaign.data.journal[index].pinned = !campaign.data.journal[index].pinned;
    };

    return {
      campaign,
      config,
      pinIcon,
      pin,
    };
  },
});
</script>
