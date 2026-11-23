<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.derelict()}`"
      header-class="derelict-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      :caption="$t('enums.sectorItem.Derelict')"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col" :label="$t('common.name')" v-model="data.name" />
        <q-select
          class="col"
          :label="$t('common.location')"
          v-model="data.location"
          :options="locOpts"
          map-options
          emit-value
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-select
          class="col"
          :label="$t('common.type')"
          v-model="data.type"
          :options="typeOpts"
          map-options
          emit-value
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" :label="$t('oracles.fields.condition')" v-model="data.condition" />
        <i-input class="col" :label="$t('oracles.fields.outerFirstLook')" v-model="data.outerFirstLook" />
      </div>

      <i-input class="q-mb-sm" :label="$t('common.notes')" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';

import { IDerelict, ESLocation, EDerelictType } from '../models';

import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';
import { enumOptions } from 'src/i18n';

import Controls from './Controls.vue';
import IInput from '../Widgets/IInput.vue';

export default defineComponent({
  components: { IInput, Controls },
  name: 'SDerelict',
  props: {
    modelValue: {
      type: Object as PropType<IDerelict>,
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
    const typeOpts = computed(() => enumOptions(Object.values(EDerelictType), 'enums.derelictType'));
    return {
      data,
      config,
      ESLocation,
      EDerelictType,
      locOpts,
      typeOpts,
      icon,
    };
  },
});
</script>

<style lang="sass">
.derelict-header
  background-color: $derelict
  text-shadow: 1px 1px 1px $dark-page
</style>
