<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.planet(data.type)}`"
      header-class="planet-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      :caption="$t('enums.sectorItem.Planet')"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" :label="$t('common.name')" v-model="data.name" />
        <q-select
          :label="$t('common.type')"
          v-model="data.type"
          :options="planetClassOpts"
          map-options
          emit-value
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <i-input class="q-mb-sm" :label="$t('common.description')" v-model="data.description" autogrow />

      <div class="row q-gutter-sm justify-between q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" :label="$t('oracles.fields.atmosphere')" v-model="data.atmosphere" />
        <i-input class="col" :label="$t('oracles.fields.settlements')" v-model="data.settlements" />
        <i-input class="col" :label="$t('oracles.fields.life')" v-model="data.life" />
      </div>
      <div v-else>
        <div class="row q-gutter-sm justify-between q-mb-sm">
          <i-input class="col" :label="$t('oracles.fields.atmosphere')" v-model="data.atmosphere" />
          <i-input class="col" :label="$t('oracles.fields.settlements')" v-model="data.settlements" />
        </div>

        <i-input class="q-mb-sm" :label="$t('oracles.fields.life')" v-model="data.life" />
      </div>

      <i-input v-if="data.type == EPClass.Vital" class="q-mb-sm" :label="$t('oracles.fields.diversity')" v-model="data.diversity" />
      <i-input v-if="data.type == EPClass.Vital" class="q-mb-sm" :label="$t('oracles.fields.biomes')" v-model="data.biomes" />

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" :label="$t('oracles.fields.observedFromSpace')" v-model="data.observed" />
        <i-input class="col" :label="$t('oracles.fields.planetsideFeatures')" v-model="data.feature" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" :label="$t('oracles.fields.observedFromSpace')" v-model="data.observed" />
        <i-input class="q-mb-sm" :label="$t('oracles.fields.planetsideFeatures')" v-model="data.feature" />
      </div>

      <i-input class="q-mb-sm" :label="$t('common.notes')" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';

import { IPlanet, EPClass } from '../models';

import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';
import { enumOptions } from 'src/i18n';

import Controls from './Controls.vue';
import IInput from '../Widgets/IInput.vue';

export default defineComponent({
  components: { IInput, Controls },
  name: 'SPlanet',
  props: {
    modelValue: {
      type: Object as PropType<IPlanet>,
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
    const planetClassOpts = computed(() => enumOptions(Object.values(EPClass), 'enums.planetClass'));

    return {
      data,
      config,
      EPClass,
      planetClassOpts,
      icon,
    };
  },
});
</script>

<style lang="sass">
.planet-header
  background-color: $planet
  text-shadow: 1px 1px 1px $dark-page
</style>
