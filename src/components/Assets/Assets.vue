<template>
  <q-dialog v-model="showDialog" full-width full-height transition-show="slide-up" transition-hide="slide-down">
    <q-layout container class="asset-bg">
      <q-card class="asset-bg">
        <q-header elevated>
          <q-toolbar class="bg-secondary">
            <q-toolbar-title>
              <q-input
                class="col-grow"
                v-if="showEditor === false"
                label="Filter by name or type"
                v-model="filter"
                borderless
                clearable
                debounce="750"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-toolbar-title>

            <q-btn class="col-shrink" icon="close" flat dense @click="close" />
          </q-toolbar>
        </q-header>

        <q-card-section class="q-mt-xl" v-if="showEditor === false">
          <div class="q-mb-sm row q-gutter-lg justify-evenly">
            <q-card class="my-card asset-card">
              <q-card-section class="text-bold bg-secondary">
                <div class="row items-center">
                  <div class="col-grow">Add Custom Asset</div>
                </div>
              </q-card-section>

              <q-card-section class="column q-pb-xl fit justify-center">
                <q-btn
                  class="self-center q-mb-lg"
                  size="xl"
                  outline
                  icon="add"
                  @click="
                    editID = 'new';
                    showEditor = true;
                  "
                />
              </q-card-section>
            </q-card>

            <asset v-for="(a, i) in cards" :key="i" v-model="cards[i]" browse>
              <template v-slot:prepend v-if="a.id">
                <q-btn
                  icon="edit"
                  flat
                  dense
                  size="sm"
                  @click="
                    editID = a.id;
                    showEditor = true;
                  "
                >
                  <q-tooltip>Edit custom asset</q-tooltip>
                </q-btn>
              </template>

              <template v-slot:append v-if="a.id">
                <q-btn icon="delete" flat dense size="sm" @click="customAssets.delete(a)">
                  <q-tooltip>Delete custom asset</q-tooltip>
                </q-btn>
              </template>
            </asset>
          </div>
        </q-card-section>

        <q-card-section v-else>
          <asset-editor :id="editID" v-model="showEditor" />
        </q-card-section>
      </q-card>
    </q-layout>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { Assets } from 'src/lib/assets';
import Asset from 'src/components/Assets/Asset.vue';
import { IAsset } from 'src/components/models';
import AssetEditor from './AssetEditor.vue';
import { useAssets } from 'src/store/assets';

export default defineComponent({
  name: 'Assets',
  components: { Asset, AssetEditor },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, ctx) {
    const showDialog = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (showDialog.value = props.modelValue)
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

    const showEditor = ref(false);
    const editID = ref('new');

    return {
      showDialog,
      close,
      Assets,
      filter,
      cards,

      showEditor,
      editID,
      customAssets,
    };
  },
});
</script>
