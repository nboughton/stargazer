<template>
  <div class="column justify-center items-center">
    <div class="row full-width q-gutter-sm items-center">
      <i-input class="col-grow" label="Name" v-model="data.name" />
      <q-select class="col" v-model="data.segments" :options="[4, 6, 8, 10]" borderless />
      <q-btn class="col-shrink" v-if="config.data.edit" flat dense icon="delete" @click="$emit('delete')" />
    </div>

    <q-circular-progress
      :value="value"
      size="200px"
      :thickness="1"
      color="negative"
      track-color="white"
      class="q-ma-md clock"
      show-value
      @click="data.filled++"
    >
      <div class="row clock-icon-bgk items-center justify-center">
        <q-icon :name="`mdi-numeric-${data.segments - data.filled}`" color="white" class="q-ma-none q-pa-none" />
      </div>
    </q-circular-progress>

    <div class="row full-width q-gutter-sm items-center">
      <q-select class="col-grow" label="Advance" v-model="data.advance" :options="Object.values(EAtO)" dense />
      <q-btn class="col-shrink" flat dense :label="data.roll" disable />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="roll" />
    </div>
  </div>
</template>

<script lang="ts">
import { RollClock } from 'src/lib/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent, watch, computed, ref, PropType } from 'vue';
import IInput from '../IInput.vue';
import { IClock, EAtO } from '../models';
export default defineComponent({
  components: { IInput },
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

    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );
    watch(
      () => data.value,
      () => {
        if (data.value.filled > data.value.segments) data.value.filled = 0;
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

<style lang="sass">
.clock
  cursor: pointer
  background: $secondary
  padding: 8px
  clip-path: circle(50%)

.clock-icon-bgk
  clip-path: circle(50%)
  background-color: $secondary
</style>