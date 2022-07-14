<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.settlement()}`"
      header-class="settlement-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      caption="Settlement"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" label="Name" v-model="data.name" />
        <q-select
          label="Type"
          v-model="data.location"
          :options="Object.values(ESLocation)"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm justify-between q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Authority" v-model="data.authority" />
        <q-select
          class="col"
          label="Population"
          v-model="data.population"
          :options="Object.values(ESettPop)"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <i-input class="col" label="Projects" v-model="data.projects" />
      </div>
      <div v-else>
        <div class="row q-gutter-sm justify-between q-mb-sm">
          <i-input class="col" label="Authority" v-model="data.authority" />
          <q-select
            class="col"
            label="Population"
            v-model="data.population"
            :options="Object.values(ESettPop)"
            standout="bg-blue-grey text-white"
            :input-style="{ color: '#ECEFF4' }"
            dense
          />
        </div>

        <i-input class="q-mb-sm" label="Projects" v-model="data.projects" />
      </div>

      <div class="row q-gutter-sm justify-between q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="First Look" v-model="data.firstLook" />
        <i-input class="col" label="Initial Contact" v-model="data.initialContact" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" label="First Look" v-model="data.firstLook" />
        <i-input class="q-mb-sm" label="Initial Contact" v-model="data.initialContact" />
      </div>

      <i-input class="q-mb-sm" label="Trouble" v-model="data.trouble" />
      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

import { ISettlement, ESLocation, ESettPop } from '../models';

import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';

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

    return {
      data,
      config,
      ESLocation,
      ESettPop,
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
