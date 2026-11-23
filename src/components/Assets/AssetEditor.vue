<template>
  <div class="row full-height fit">
    <!-- editor column -->
    <div class="col-12">
      <q-input :label="$t('common.title')" v-model="data.title" dense />
      <q-input :label="$t('assets.editor.subtitle')" v-model="subtitle" dense />

      <div class="row items-center q-mb-lg">
        <q-toggle class="q-mr-md q-mt-sm" :label="$t('assets.editor.textInput')" v-model="hasMainInput" dense @click="mInputClick" />
        <q-input class="col-grow" v-if="hasMainInput" :label="$t('assets.editor.inputLabel')" v-model="data.input!.label" dense />
      </div>

      <p>{{ $t('assets.editor.htmlTagsInfo') }}</p>
      <p>{{ validTags.toString().replace(/,/g, ', ') }}</p>

      <q-input
        :label="$t('assets.editor.firstItemText')"
        v-model="data.items[0].text"
        dense
        autogrow
        :hint="$t('assets.editor.itemHtmlHint')"
      />
      <div class="row items-center q-mb-lg q-mt-xs">
        <q-toggle class="q-mr-md" :label="$t('assets.editor.textInput')" v-model="hasItem1Input" dense @click="item1Click" />
        <q-input class="col-grow" v-if="hasItem1Input" :label="$t('assets.editor.inputLabel')" v-model="data.items[0].input!.label" dense />
      </div>

      <q-input
        :label="$t('assets.editor.secondItemText')"
        v-model="data.items[1].text"
        dense
        autogrow
        :hint="$t('assets.editor.itemHtmlHint')"
      />
      <div class="row items-center q-mb-lg q-mt-xs">
        <q-toggle class="q-mr-md" :label="$t('assets.editor.textInput')" v-model="hasItem2Input" dense @click="item2Click" />
        <q-input class="col-grow" v-if="hasItem2Input" :label="$t('assets.editor.inputLabel')" v-model="data.items[1].input!.label" dense />
      </div>

      <q-input
        :label="$t('assets.editor.thirdItemText')"
        v-model="data.items[2].text"
        dense
        autogrow
        :hint="$t('assets.editor.itemHtmlHint')"
      />
      <div class="row items-center q-mb-lg q-mt-xs">
        <q-toggle class="q-mr-md" :label="$t('assets.editor.textInput')" v-model="hasItem3Input" dense @click="item3Click" />
        <q-input class="col-grow" v-if="hasItem3Input" :label="$t('assets.editor.inputLabel')" v-model="data.items[2].input!.label" dense />
      </div>

      <q-toggle class="row" :label="$t('assets.editor.resourceTrack')" v-model="hasTrack" dense @click="trackClick" />
      <div class="row items-center q-mb-lg">
        <q-input class="col-grow" v-if="hasTrack" :label="$t('common.min')" type="number" v-model.number="data.track!.min" dense />
        <q-input class="col-grow" v-if="hasTrack" :label="$t('common.max')" type="number" v-model.number="data.track!.max" dense />
      </div>

      <div class="row justify-between">
        <q-btn color="positive" icon="save" :label="$t('common.saveLower')" flat @click="save(data)" />
        <q-btn color="negative" icon="close" :label="$t('common.closeLower')" flat @click="close" />
      </div>
    </div>

    <!-- preview column -->
    <div class="col-12">
      <div class="row full-width full-height justify-center">
        <asset class="self-center" v-model="data" expanded style="min-width: 100%" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref, watch } from 'vue';

import { ISGAsset } from 'src/components/models';

import { useAssets } from 'src/store/assets';

import { NewAsset } from 'src/lib/assets';
import { validTags } from 'src/lib/util';
import { db } from 'src/lib/db';

import Asset from './Asset.vue';

export default defineComponent({
  components: { Asset },
  name: 'AssetEditor',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      default: 'new',
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = ref(NewAsset());

    const assets = useAssets();
    const close = () => {
      ctx.emit('update:modelValue', false);
    };
    const save = (a: ISGAsset) => {
      assets.save(a).catch((err) => console.log(err));
      close();
    };

    const subtitle = ref('');
    watch(
      () => subtitle.value,
      () => {
        subtitle.value ? (data.value.subtitle = subtitle.value) : (data.value.subtitle = undefined);
      }
    );

    const hasMainInput = ref(false);
    const mInputClick = () => {
      hasMainInput.value ? (data.value.input = { label: '', text: '' }) : (data.value.input = undefined);
    };

    const hasItem1Input = ref(false);
    const item1Click = () => {
      hasItem1Input.value
        ? (data.value.items[0].input = { label: '', text: '' })
        : (data.value.items[0].input = undefined);
    };

    const hasItem2Input = ref(false);
    const item2Click = () => {
      hasItem2Input.value
        ? (data.value.items[1].input = { label: '', text: '' })
        : (data.value.items[1].input = undefined);
    };

    const hasItem3Input = ref(false);
    const item3Click = () => {
      hasItem3Input.value
        ? (data.value.items[2].input = { label: '', text: '' })
        : (data.value.items[2].input = undefined);
    };

    const hasTrack = ref(false);
    const trackClick = () => {
      hasTrack.value ? (data.value.track = { value: 0, min: 0, max: 3 }) : (data.value.track = undefined);
    };

    // Load data if it's not a new asset
    void (async () => {
      if (props.id !== 'new') {
        data.value = (await db.assets.get(props.id)) as ISGAsset;

        if (data.value.subtitle) subtitle.value = data.value.subtitle;

        hasMainInput.value = !!data.value.input;
        hasItem1Input.value = !!data.value.items[0].input;
        hasItem2Input.value = !!data.value.items[1].input;
        hasItem3Input.value = !!data.value.items[2].input;
        hasTrack.value = !!data.value.track;
      }
    })();

    return {
      data,
      validTags,

      subtitle,
      hasMainInput,
      mInputClick,

      hasItem1Input,
      item1Click,

      hasItem2Input,
      item2Click,

      hasItem3Input,
      item3Click,

      hasTrack,
      trackClick,

      save,
      close,
    };
  },
});
</script>
