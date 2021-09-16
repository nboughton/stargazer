<template>
  <div>
    <q-expansion-item
      :icon="icon.derelict()"
      header-class="derelict-header text-h5 sf-header rounded-borders q-mb-sm"
      :label="data.name"
      caption="Derelict"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col" label="Name" v-model="data.name" />
        <q-select
          class="col"
          label="Location"
          v-model="data.location"
          :options="Object.values(ESLocation)"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-select
          class="col"
          label="Type"
          v-model="data.type"
          :options="Object.values(EDerelictType)"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" label="Condition" v-model="data.condition" />
        <i-input class="col" label="Outer First Look" v-model="data.outerFirstLook" />
      </div>

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch } from 'vue';
import Controls from './Controls.vue';
import IInput from '../IInput.vue';
import { IDerelict, ESLocation, EDerelictType } from '../models';
import { icon } from 'src/lib/icons';
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
    return {
      data,
      config,
      ESLocation,
      EDerelictType,
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
