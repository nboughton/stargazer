<template>
  <!-- file deepcode ignore PureFunctionReturnValueIgnored: value passed to component -->
  <div>
    <q-expansion-item
      :icon="`img:${icon.planet(data.type)}`"
      header-class="planet-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      caption="Planet"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" label="Name" v-model="data.name" />
        <q-select
          label="Type"
          v-model="data.type"
          :options="Object.values(EPClass)"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn v-if="app.config.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <i-input class="q-mb-sm" label="Description" v-model="data.description" autogrow />

      <div class="row q-gutter-sm justify-between q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Atmosphere" v-model="data.atmosphere" />
        <i-input class="col" label="Settlements" v-model="data.settlements" />
        <i-input class="col" label="Life" v-model="data.life" />
      </div>
      <div v-else>
        <div class="row q-gutter-sm justify-between q-mb-sm">
          <i-input class="col" label="Atmosphere" v-model="data.atmosphere" />
          <i-input class="col" label="Settlements" v-model="data.settlements" />
        </div>

        <i-input class="q-mb-sm" label="Life" v-model="data.life" />
      </div>

      <i-input v-if="data.type == EPClass.Vital" class="q-mb-sm" label="Diversity" v-model="data.diversity" />
      <i-input v-if="data.type == EPClass.Vital" class="q-mb-sm" label="Biomes" v-model="data.biomes" />

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Observed from Space" v-model="data.observed" />
        <i-input class="col" label="Planetside Features" v-model="data.feature" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" label="Observed from Space" v-model="data.observed" />
        <i-input class="q-mb-sm" label="Planetside Features" v-model="data.feature" />
      </div>

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

import { IPlanet, EPClass } from '../models';

import { useCampaign } from 'src/store/campaign';

import { icon } from 'src/lib/icons';

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

    const app = useCampaign();

    return {
      data,
      app,
      EPClass,
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
