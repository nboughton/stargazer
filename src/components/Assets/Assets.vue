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
              <q-input
                v-if="showEditor === false"
                :label="$t('assets.filterPlaceholder')"
                v-model="filter"
                borderless
                clearable
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
                <q-item-label>{{ $t('assets.addCustom') }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-for="(a, i) in cards" :key="i" clickable v-ripple @click="selectAsset(i as string)">
              <q-item-section avatar>
                <q-avatar :icon="assetIcon(a)" size="lg" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ a.title }}</q-item-label>
                <q-item-label caption>{{ displayAssetType(a) }}</q-item-label>
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
                <div class="col-shrink text-h5 sf-header">{{ displayAssetType(ca) }}</div>
                <div class="col-shrink sf-header text-h4">::{{ ca.title }}</div>
              </div>

              <div class="q-mb-sm" v-if="ca.subtitle" v-html="ca.subtitle" />

              <div
                class="q-py-sm text-justify row items-center no-wrap"
                v-for="(a, i) in ca.items"
                :key="i"
                style="border-bottom: 1px solid grey"
              >
                <hexbox class="col-1" v-model="a.marked" :label="$t('assets.abilityLabel', { n: i + 1 })" />
                <div class="col-10 q-ml-xs asset-text" v-html="a.text" />
              </div>

              <div class="row full-width justify-between">
                <q-btn
                  v-if="config.data.edit && ca.id"
                  class="q-ma-md"
                  outline
                  :label="$t('common.delete')"
                  @click="customAssets.delete(ca)"
                />
                <q-btn class="q-ma-md" outline :label="$t('common.add')" @click="addAsset(ca.id || ca.dfId || ca.title)" />
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

import { useConfig } from 'src/store/config';
import { useAssets } from 'src/store/assets';
import { useCampaign } from 'src/store/campaign';

import { convertDFAsset } from 'src/lib/assets';
import { currentStarforged, starforgedEN } from 'src/lib/dataforged';
import { icon } from 'src/lib/icons';
import { translateKey } from 'src/i18n';

import AssetEditor from './AssetEditor.vue';
import Hexbox from '../Widgets/Hexbox.vue';

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

    const enNameByDfId = (dfId?: string): string | undefined => {
      if (!dfId) return undefined;
      for (const t of starforgedEN['Asset Types']) {
        const found = t.Assets.find((a) => a.$id === dfId);
        if (found) return found.Name;
      }
      return undefined;
    };

    const assetIcon = (asset: ISGAsset): string => {
      if (asset.id) return icon.asset(asset.title, true);
      return icon.asset(enNameByDfId(asset.dfId) || asset.title, false);
    };

    const displayAssetType = (asset: ISGAsset): string => {
      if (asset.assetTypeId) {
        const found = currentStarforged.value['Asset Types'].find((t) => t.$id === asset.assetTypeId);
        if (found) return found.Name;
      }
      const key = `assets.types.${asset.type}`;
      const translated = translateKey(key);
      return translated === key ? asset.type : translated;
    };

    const filter = ref('');
    const show = (asset: ISGAsset): boolean => {
      if (filter.value === '' || filter.value === null) {
        return true;
      }

      const query = filter.value.toLowerCase();
      const altQuery = query.replace(/espa[çc]onave/g, 'nave estelar');
      const matches = (str?: string): boolean => {
        if (!str) return false;
        const lower = str.toLowerCase();
        return lower.includes(query) || lower.includes(altQuery);
      };

      if (matches(asset.title)) {
        return true;
      }

      const localizedType = displayAssetType(asset);
      if (matches(localizedType)) {
        return true;
      }

      if (matches(asset.type)) {
        return true;
      }

      if (matches(asset.subtitle)) {
        return true;
      }
      return false;
    };

    const cards = computed((): { [index: string]: ISGAsset } => {
      const out: { [index: string]: ISGAsset } = {};
      customAssets.data.forEach((a) => {
        if (show(a)) out[a.id || a.title] = a;
      });

      currentStarforged.value['Asset Types'].forEach((t) => {
        t.Assets.forEach((a) => {
          const sgAsset = convertDFAsset(a);
          if (show(sgAsset)) out[a.$id] = sgAsset;
        });
      });

      return out;
    });

    const selectAsset = (id: string) => {
      showEditor.value = false;
      ca.value = cards.value[id];
    };

    const addAsset = (id: string) => {
      const target = cards.value[id];
      if (!target) return;
      const dataCopy = JSON.parse(JSON.stringify(target)) as ISGAsset;
      campaign.data.character.assets.push(dataCopy);
    };

    const showEditor = ref(false);
    const showList = ref(true);
    const editID = ref('new');
    const getDefaultAsset = (): ISGAsset => {
      const pathType =
        currentStarforged.value['Asset Types'].find((t) => t.$id === 'Starforged/Assets/Path') ||
        currentStarforged.value['Asset Types'][0];
      const aceAsset = pathType?.Assets.find((a) => a.$id === 'Starforged/Assets/Path/Ace') || pathType?.Assets[0];
      return convertDFAsset(aceAsset);
    };
    const ca = ref(getDefaultAsset());

    watch(currentStarforged, () => {
      if (ca.value.dfId && cards.value[ca.value.dfId]) {
        ca.value = cards.value[ca.value.dfId];
      } else if (!ca.value.id) {
        ca.value = getDefaultAsset();
      }
    });

    return {
      config,
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
      assetIcon,
      displayAssetType,
    };
  },
});
</script>
