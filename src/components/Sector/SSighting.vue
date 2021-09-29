<template>
  <q-expansion-item
    :icon="`img:${icon.sighting(data.name)}`"
    header-class="sighting-header rounded-borders q-mb-sm"
    :label="data.name"
    caption="Sighting"
  >
    <div class="row q-mb-sm" v-if="controls">
      <controls class="col" @move="$emit('move', $event)" />
    </div>

    <div class="row q-gutter-sm q-mb-sm">
      <i-input class="col-grow" label="Name" v-model="data.name" />
      <q-btn class="col-shrink" v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
    </div>
    <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
  </q-expansion-item>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch } from 'vue';
import { ISighting } from '../models';
import { icon } from 'src/lib/icons';

import IInput from '../IInput.vue';
import Controls from './Controls.vue';
export default defineComponent({
  components: { IInput, Controls },
  name: 'Sighting',
  props: {
    modelValue: {
      type: Object as PropType<ISighting>,
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
      icon,
    };
  },
});
</script>

<style lang="sass">
.sighting-header
  background-color: $sighting
  text-shadow: 1px 1px 1px $dark-page
</style>
