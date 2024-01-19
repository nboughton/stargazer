<template>
  <div class="row q-gutter-sm items-center">
    <div class="col-grow">
      <div class="row full-width q-gutter-sm items-center q-mb-xs">
        <q-input class="col-grow" label="Name" v-model="data.name" debounce="750" dense />
        <q-select class="col" v-model="data.segments" :options="[4, 6, 8, 10]" borderless dense />
        <q-btn class="col-shrink" v-if="config.data.edit" flat dense icon="delete" @click="$emit('delete')" />
      </div>

      <div class="row full-width q-gutter-sm items-center">
        <q-select class="col-grow" label="Advance" v-model="data.advance" :options="Object.values(EAtO)" dense />
        <q-btn class="col-shrink" icon-right="mdi-dice-6" flat dense @click="roll" :label="data.roll" />
      </div>
    </div>

    <div class="col-shrink">
      <q-circular-progress
        :value="value"
        size="100px"
        :thickness="1"
        color="negative"
        track-color="white"
        class="clock-outline"
        show-value
        @click="data.filled++"
      >
        <div class="row clock-icon-bgk items-center justify-center">
          <q-icon :name="`mdi-numeric-${data.segments - data.filled}`" color="white" class="q-ma-none q-pa-none" />
        </div>
      </q-circular-progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, computed, ref, PropType } from 'vue';

import { IClock, EAtO } from '../models';

import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';

import { RollClock } from 'src/lib/tracks';

export default defineComponent({
  name: 'Clock',
  props: {
    modelValue: {
      type: Object as PropType<IClock>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'delete'],
  setup(props, { emit }) {
    const data = ref(props.modelValue);
    const config = useConfig();
    const campaign = useCampaign();

    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );
    watch(
      () => data.value,
      () => {
        if (data.value.filled === data.value.segments && !data.value.complete) {
          data.value.complete = true;
          campaign.appendToJournal(0, `<div class="note clock"><b>[Clock completed: ${data.value.name}]</b>&nbsp;</div>`);
        }
        if (data.value.filled > data.value.segments) {
          data.value.filled = 0;
          data.value.complete = false;
        }
        emit('update:modelValue', data.value);
      },
      { deep: true }
    );

    const value = computed(() => {
      return (100 / data.value.segments) * data.value.filled;
    });

    const roll = () => {
      if (data.value.advance !== EAtO.NoRoll) {
        data.value = RollClock(data.value);
      }
    };
    return {
      config,
      data,
      value,
      EAtO,
      roll,
    };
  },
});
</script>

<style lang="sass" scoped>
.clock-outline
  cursor: pointer
  background: $secondary
  padding: 5px
  margin: auto
  clip-path: circle(50%)

.clock-icon-bgk
  clip-path: circle(50%)
  background-color: $secondary
</style>
