<template>
  <!-- file deepcode ignore PureFunctionReturnValueIgnored: value passed to component -->
  <div>
    <q-expansion-item
      :icon="`img:${icon.creature(data.form)}`"
      header-class="creature-header rounded-borders q-mb-sm"
      :label="data.name"
      caption="Creature"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col" label="Name" v-model="data.name" />
        <i-input class="col" label="Scale" v-model="data.scale" />
        <q-select
          class="col"
          label="Environment"
          v-model="data.environment"
          :options="Object.values(EEnv)"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn class="col-shrink" v-if="app.config.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Form" v-model="data.form" />
        <i-input class="col" label="First Look" v-model="data.firstLook" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" label="Form" v-model="data.form" />
        <i-input class="q-mb-sm" label="First Look" v-model="data.firstLook" />
      </div>

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Observed Behaviour" v-model="data.behaviour" />
        <i-input class="col" label="Revealed Aspect" v-model="data.aspect" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" label="Observed Behaviour" v-model="data.behaviour" />
        <i-input class="q-mb-sm" label="Revealed Aspet" v-model="data.aspect" />
      </div>

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

import { ICreature, EEnv } from '../models';

import { useCampaign } from 'src/store/campaign';

import { icon } from 'src/lib/icons';

import IInput from '../Widgets/IInput.vue';
import Controls from './Controls.vue';

export default defineComponent({
  components: { IInput, Controls },
  name: 'SCreature',
  props: {
    modelValue: {
      type: Object as PropType<ICreature>,
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
      EEnv,
      icon,
    };
  },
});
</script>

<style lang="sass">
.creature-header
  background-color: $creature
  text-shadow: 1px 1px 1px $dark-page
</style>
