<template>
  <q-expansion-item header-class="bg-secondary rounded-borders">
    <template v-slot:header>
      <q-item class="row full-width">
        <q-item-section class="col-shrink" avatar>
          <q-icon :name="icon.asset(data.title)" />
        </q-item-section>

        <q-item-section class="col-grow">
          <q-item-label>{{ data.title }}</q-item-label>
          <q-item-label caption>{{ data.type }}</q-item-label>
        </q-item-section>

        <q-item-section class="col-shrink" side v-if="config.data.edit">
          <slot name="append" />
        </q-item-section>
      </q-item>
    </template>
    <div class="q-pa-md q-gutter-sm">
      <div v-if="data.subtitle" v-html="data.subtitle" />
      <i-input class="q-mb-sm" v-if="data.input" :label="data.input.label" v-model="data.input.text" />
      <div v-for="(item, index) in data.items" :key="index">
        <div class="row q-mb-sm no-wrap">
          <q-checkbox class="col-1 self-center" v-model="data.items[index].marked" dense />
          <div class="col-11 q-my-sm q-ml-sm text-justify asset-text" v-html="item.text" />
        </div>
        <div class="row justify-end">
          <i-input
            class="col-11"
            v-if="data.items[index].input"
            :label="data.items[index].input.label"
            v-model="data.items[index].input.text"
          />
        </div>
      </div>
      <div class="row justify-evenly q-gutter-sm">
        <q-checkbox v-if="data.cursed != undefined" label="Cursed" v-model="data.cursed" />
        <q-checkbox v-if="data.battered != undefined" label="Battered" v-model="data.battered" />
      </div>

      <resource-track class="col-grow" v-if="data.track" v-model="data.track" reverse variable />
    </div>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue';
import IInput from '../IInput.vue';
import { IAsset } from '../models';
import { icon } from 'src/lib/icons';
import ResourceTrack from '../Tracks/ResourceTrack.vue';
import { useQuasar } from 'quasar';
import { useConfig } from 'src/store/config';
export default defineComponent({
  components: { IInput, ResourceTrack },
  name: 'Asset',
  props: {
    modelValue: {
      type: Object as PropType<IAsset>,
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

    const $q = useQuasar();
    const width = computed((): string => {
      return $q.screen.lt.sm ? 'min-width: 90%' : '';
    });

    const dExpanded = ref(props.expanded);
    const config = useConfig();
    return {
      data,
      dExpanded,
      icon,
      width,
      config,
    };
  },
});
</script>
