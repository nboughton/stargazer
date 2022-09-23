<template>
  <q-card class="card-bg rounded-borders">
    <q-card-section class="row bg-secondary q-pa-xs items-center justify-between">
      <div class="col-3">
        <div class="row">
          <!--q-icon :name="icon.asset(data.title)" /-->
          <hexbox
            :label="`asset ability ${index + 1}`"
            v-for="(box, index) in data.items"
            :key="index"
            v-model="data.items[index].marked"
          />
        </div>
      </div>

      <div class="col-4 sf-header text-h5 q-mx-xs text-center">
        {{ data.title }}
        <slot name="append" v-if="config.data.edit" />
      </div>

      <div class="col-3 text-h6 sf-header q-mr-sm text-right">
        {{ data.type }}
      </div>
    </q-card-section>

    <q-card-section class="q-pa-sm">
      <div class="q-mb-sm" v-if="data.subtitle" v-html="data.subtitle" />

      <q-input dense class="q-mb-sm" v-if="data.input" :label="data.input.label" v-model="data.input.text" />

      <div v-for="(item, index) in data.items" :key="index">
        <div v-if="item.marked">
          <div class="row q-mb-sm no-wrap items-center q-pr-sm">
            <q-separator vertical />
            <div class="col q-mx-sm text-justify asset-text" v-html="item.text" />
          </div>
          <q-input
            class="q-mb-sm"
            dense
            v-if="data.items[index].input"
            :label="data.items[index].input!.label"
            v-model="data.items[index].input!.text"
          />
        </div>
      </div>
      <div class="row justify-evenly q-gutter-sm">
        <q-checkbox v-if="data.cursed != undefined" label="Cursed" v-model="data.cursed" />
        <q-checkbox v-if="data.battered != undefined" label="Battered" v-model="data.battered" />
      </div>

      <resource-track class="col-grow q-mt-xs" v-if="data.track" v-model="data.track" reverse variable />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue';

import { ISGAsset } from '../models';

import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';

import ResourceTrack from '../Tracks/ResourceTrack.vue';
import Hexbox from '../Widgets/Hexbox.vue';

export default defineComponent({
  components: { ResourceTrack, Hexbox },
  name: 'Asset',
  props: {
    modelValue: {
      type: Object as PropType<ISGAsset>,
      required: true,
    },
    expanded: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const data = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );
    watch(
      () => data.value,
      () => emit('update:modelValue', data.value),
      { deep: true }
    );

    const dots = computed((): boolean[] => {
      const out: boolean[] = [];
      data.value.items.forEach((i) => {
        out.push(i.marked);
      });
      return out;
    });

    const dExpanded = ref(props.expanded);
    const config = useConfig();
    return {
      data,
      dExpanded,
      icon,
      config,
      dots,
    };
  },
});
</script>
