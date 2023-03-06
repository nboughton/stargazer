<template>
  <q-dialog
    v-model="showDialog"
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="$q.platform.is.mobile"
  >
    <q-layout container class="asset-bg" view="hHh lpR fFf" style="min-width: 50%">
      <q-card class="asset-bg">
        <q-header elevated>
          <q-toolbar class="bg-secondary">
            <q-btn flat dense icon="menu" @click="showList = !showList" />
            <q-toolbar-title>
              <q-input v-if="showEditor === false" label="Filter by name or type" v-model="filter" borderless clearable>
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-toolbar-title>

            <q-btn icon="close" flat dense @click="close" />
          </q-toolbar>
        </q-header>

        <q-drawer side="left" v-model="showList" bordered :breakpoint="400" persistent :width="220">
          <q-list separator padding>
            <q-item clickable v-ripple @click="showEditor = true">
              <q-item-section>
                <q-item-label>Add custom asset</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-for="(a, i) in cards" :key="i" clickable v-ripple @click="selectAsset(i as string)">
              <q-item-section avatar>
                <q-avatar :icon="icon.asset(a.title)" size="lg" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ a.title }}</q-item-label>
                <q-item-label caption>{{ a.type }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-drawer>

        <q-page-container>
          <q-page class="q-pa-sm">
            <div v-if="!showEditor">
              <div class="row items-center q-gutter-xs">
                <q-btn
                  class="col-shrink"
                  v-if="ca.id"
                  icon="edit"
                  flat
                  dense
                  @click="
                    editID = ca.id as string;
                    showEditor = true;
                  "
                />
                <div class="col-shrink text-h5 sf-header">{{ ca.type }}</div>
                <div class="col-shrink sf-header text-h4">::{{ ca.title }}</div>
              </div>

              <div class="q-mb-sm" v-if="ca.subtitle" v-html="ca.subtitle" />

              <div
                class="q-py-sm text-justify row items-center no-wrap"
                v-for="(a, i) in ca.items"
                :key="i"
                style="border-bottom: 1px solid grey"
              >
                <hexbox class="col-1" v-model="a.marked" :label="`asset ability ${i + 1}`" />
                <div class="col-10 q-ml-xs asset-text" v-html="a.text" />
              </div>

              <div class="row full-width justify-between">
                <q-btn
                  v-if="campaign.config.edit && ca.id"
                  class="q-ma-md"
                  outline
                  label="Delete"
                  @click="customAssets.delete(ca)"
                />
                <q-btn class="q-ma-md" outline label="Add" @click="addAsset(ca.id || ca.title)" />
              </div>
            </div>
            <div v-else>
              <!-- asset editor here -->
              <asset-editor :id="editID" v-model="showEditor" />
            </div>
          </q-page>
        </q-page-container>
      </q-card>
    </q-layout>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

import { ISGAsset } from 'src/components/models';

import { useAssets } from 'src/store/assets';
import { useCampaign } from 'src/store/campaign';

import { convertDFAsset } from 'src/lib/assets';
import { icon } from 'src/lib/icons';

import AssetEditor from './AssetEditor.vue';
import Hexbox from '../Widgets/Hexbox.vue';
import { IAsset, starforged } from 'dataforged';
import { deepCopy } from 'src/lib/util';

export default defineComponent({
  name: 'Assets',
  components: { AssetEditor, Hexbox },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const campaign = useCampaign();
    const showDialog = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (showDialog.value = props.modelValue)
    );
    watch(
      () => showDialog.value,
      () => ctx.emit('update:modelValue', showDialog.value)
    );
    const close = () => {
      showDialog.value = false;
      showEditor.value = false;
      ctx.emit('update:modelValue', showDialog.value);
    };

    const customAssets = useAssets();

    const filter = ref('');
    const show = (asset: ISGAsset): boolean => {
      if (filter.value === '' || filter.value === null) {
        return true;
      }

      if (asset.title !== undefined) {
        if (RegExp(filter.value, 'i').test(asset.title)) {
          return true;
        }
      }

      if (asset.type !== undefined) {
        if (RegExp(filter.value, 'i').test(asset.type)) {
          return true;
        }
      }
      return false;
    };

    const cards = computed((): { [index: string]: ISGAsset } => {
      const out: { [index: string]: ISGAsset } = {};
      customAssets.data.forEach((a) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (show(a)) out[a.id!] = a;
      });

      starforged['Asset Types'].forEach((t) => {
        t.Assets.forEach((a) => {
          const sgAsset = convertDFAsset(a);
          if (show(sgAsset)) out[sgAsset.title] = sgAsset;
        });
      });

      return out;
    });

    const selectAsset = (id: string) => {
      showEditor.value = false;
      ca.value = cards.value[id];
    };

    const addAsset = (id: string) => {
      const dataCopy = deepCopy(cards.value[id]);
      campaign.data[campaign.camId].character[campaign.charId].assets.push(dataCopy);
    };

    const showEditor = ref(false);
    const showList = ref(true);
    const editID = ref('new');
    const ca = ref(
      convertDFAsset(
        starforged['Asset Types'].find((t) => t.Name === 'Path')?.Assets.find((a) => a.Name === 'Ace') as IAsset
      )
    );

    return {
      campaign,
      showDialog,
      close,
      filter,
      cards,

      showEditor,
      showList,
      editID,
      customAssets,
      selectAsset,
      addAsset,
      ca,

      icon,
    };
  },
});
</script>
