<template>
  <q-dialog v-model="showDialog" transition-show="slide-up" transition-hide="slide-down">
    <q-layout container class="asset-bg" view="hHh lpR fFf" style="min-width: 50%">
      <q-card class="asset-bg">
        <q-header elevated>
          <q-toolbar class="bg-secondary">
            <q-btn flat dense icon="menu" @click="showList = !showList" />
            <q-toolbar-title>
              <q-input
                v-if="showEditor === false"
                label="Filter by name or type"
                v-model="filter"
                borderless
                clearable
                debounce="200"
              >
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

            <q-item v-for="(a, i) in cards" :key="i" clickable v-ripple @click="selectAsset(i)">
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
                    editID = ca.id;
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
                  v-if="config.data.edit && ca.id"
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
import { Assets } from 'src/lib/assets';
import { IAsset } from 'src/components/models';
import AssetEditor from './AssetEditor.vue';
import Hexbox from '../Hexbox.vue';
import { useAssets } from 'src/store/assets';
import { useCampaign } from 'src/store/campaign';
import { icon } from 'src/lib/icons';
import { useConfig } from 'src/store/config';

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
    const config = useConfig();
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
    const show = (asset: IAsset): boolean => {
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

    const cards = computed((): { [index: string]: IAsset } => {
      const out: { [index: string]: IAsset } = {};
      customAssets.data.forEach((a) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (show(a)) out[a.id!] = a;
      });

      Object.keys(Assets).forEach((key) => {
        if (show(Assets[key])) out[key] = Assets[key];
      });
      return out;
    });

    const selectAsset = (id: string) => {
      showEditor.value = false;
      ca.value = cards.value[id];
    };

    const addAsset = (id: string) => {
      const dataCopy = JSON.parse(JSON.stringify(cards.value[id])) as IAsset;
      campaign.data.character.assets.push(dataCopy);
    };

    const showEditor = ref(false);
    const showList = ref(true);
    const editID = ref('new');
    const ca = ref(Assets['Ace']);

    return {
      config,
      showDialog,
      close,
      Assets,
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
