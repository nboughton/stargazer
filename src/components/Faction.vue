<template>
  <div class="row q-mb-sm text-h6">
    {{ data.name }} <q-btn v-if="config.data.edit" flat dense icon="delete" @click="$emit('delete')" />
  </div>
  <div class="row q-gutter-sm q-mb-sm">
    <i-input class="col" label="Name" v-model="data.name" />
    <i-input class="col" label="Type" v-model="data.type" />
  </div>
  <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.sm">
    <i-input class="col" v-if="isDominion" label="Leadership" v-model="data.leadership" />
    <i-input class="col" label="Influence" v-model="data.influence" />
    <i-input class="col" label="Sphere" v-model="data.sphere" />
  </div>
  <div v-else>
    <i-input class="row q-mb-sm" v-if="isDominion" label="Leadership" v-model="data.leadership" />
    <i-input class="row q-mb-sm" label="Influence" v-model="data.influence" />
    <i-input class="row q-mb-sm" label="Sphere" v-model="data.sphere" />
  </div>

  <i-input class="row q-mb-sm" label="Projects" v-model="data.projects" />
  <i-input class="row q-mb-sm" label="Relationships" v-model="data.relationships" />

  <i-input class="row q-mb-sm" label="Quirks" v-model="data.quirks" />
  <i-input class="row q-mb-sm" label="Rumors" v-model="data.rumors" />
  <i-input class="row q-mb-lg" label="Notes" v-model="data.notes" autogrow />
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, computed } from 'vue';

import { IFaction } from './models';

import { useConfig } from 'src/store/config';

import IInput from 'src/components/IInput.vue';

export default defineComponent({
  name: 'Faction',
  components: { IInput },
  props: {
    modelValue: {
      type: Object as PropType<IFaction>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'delete'],
  setup(props, { emit }) {
    const data = ref(props.modelValue);
    watch(
      () => data.value,
      () => emit('update:modelValue', data.value),
      { deep: true }
    );
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );

    const isDominion = computed((): boolean => {
      return data.value.type === 'Dominion';
    });

    const config = useConfig();
    return {
      data,
      isDominion,
      config,
    };
  },
});
</script>
