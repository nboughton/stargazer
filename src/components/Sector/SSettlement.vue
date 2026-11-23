<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.settlement()}`"
      header-class="settlement-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      :caption="$t('enums.sectorItem.Settlement')"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" :label="$t('common.name')" v-model="data.name" />
        <q-select
          :label="$t('common.type')"
          v-model="data.location"
          :options="locOpts"
          map-options
          emit-value
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm justify-between q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" :label="$t('oracles.fields.authority')" v-model="data.authority" />
        <q-select
          class="col"
          :label="$t('oracles.fields.population')"
          v-model="data.population"
          :options="popOpts"
          map-options
          emit-value
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <i-input class="col" :label="$t('faction.projects')" v-model="data.projects" />
      </div>
      <div v-else>
        <div class="row q-gutter-sm justify-between q-mb-sm">
          <i-input class="col" :label="$t('oracles.fields.authority')" v-model="data.authority" />
          <q-select
            class="col"
            :label="$t('oracles.fields.population')"
            v-model="data.population"
            :options="popOpts"
            map-options
            emit-value
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            dense
          />
        </div>

        <i-input class="q-mb-sm" :label="$t('faction.projects')" v-model="data.projects" />
      </div>

      <div class="row q-gutter-sm justify-between q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" />
        <i-input class="col" :label="$t('oracles.fields.initialContact')" v-model="data.initialContact" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" />
        <i-input class="q-mb-sm" :label="$t('oracles.fields.initialContact')" v-model="data.initialContact" />
      </div>

      <i-input class="q-mb-sm" :label="$t('oracles.fields.trouble')" v-model="data.trouble" />
      <i-input class="q-mb-sm" :label="$t('common.notes')" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';

import { ISettlement, ESLocation, ESettPop } from '../models';

import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';
import { enumOptions } from 'src/i18n';

import Controls from './Controls.vue';
import IInput from '../Widgets/IInput.vue';

export default defineComponent({
  components: { IInput, Controls },
  name: 'SSettlement',
  props: {
    modelValue: {
      type: Object as PropType<ISettlement>,
      required: true,
    },
    controls: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'delete', 'move'],
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

    const config = useConfig();
    const locOpts = computed(() => enumOptions(Object.values(ESLocation), 'enums.location'));
    const popOpts = computed(() => enumOptions(Object.values(ESettPop), 'enums.settPop'));

    return {
      data,
      config,
      ESLocation,
      ESettPop,
      locOpts,
      popOpts,
      icon,
    };
  },
});
</script>

<style lang="sass">
.settlement-header
  background-color: $settlement
  text-shadow: 1px 1px 1px $dark-page
</style>
