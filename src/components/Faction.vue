<template>
  <div class="row q-mb-sm text-h6">
    {{ data.name }} <q-btn v-if="config.data.edit" flat dense icon="delete" @click="$emit('delete')" />
  </div>
  <div class="row q-gutter-sm q-mb-sm">
    <i-input class="col" :label="$t('common.name')" v-model="data.name" />
    <i-input class="col" :label="$t('common.type')" v-model="data.type" />
  </div>
  <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.sm">
    <i-input class="col" v-if="isDominion" :label="$t('faction.leadership')" v-model="data.leadership" />
    <i-input class="col" :label="$t('faction.influence')" v-model="data.influence" />
    <i-input class="col" :label="$t('faction.sphere')" v-model="data.sphere" />
  </div>
  <div v-else>
    <i-input class="row q-mb-sm" v-if="isDominion" :label="$t('faction.leadership')" v-model="data.leadership" />
    <i-input class="row q-mb-sm" :label="$t('faction.influence')" v-model="data.influence" />
    <i-input class="row q-mb-sm" :label="$t('faction.sphere')" v-model="data.sphere" />
  </div>

  <i-input class="row q-mb-sm" :label="$t('faction.projects')" v-model="data.projects" />
  <i-input class="row q-mb-sm" :label="$t('faction.relationships')" v-model="data.relationships" />

  <i-input class="row q-mb-sm" :label="$t('faction.quirks')" v-model="data.quirks" />
  <i-input class="row q-mb-sm" :label="$t('faction.rumors')" v-model="data.rumors" />
  <i-input class="row q-mb-lg" :label="$t('common.notes')" v-model="data.notes" autogrow />
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, computed } from 'vue';

import { IFaction } from './models';

import { useConfig } from 'src/store/config';
import * as oracle from 'src/lib/oracles';

import IInput from 'src/components/Widgets/IInput.vue';

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
      const normalized = data.value.type.trim().toLowerCase();
      if (!normalized) return false;
      const opts = oracle.valuesDetailed('Starforged/Oracles/Factions/Type');
      const match = opts.find(
        (o) => o.label.toLowerCase() === normalized || o.canonical.toLowerCase() === normalized
      );
      if (match) {
        return match.linkTarget.split('/').pop() === 'Dominion' || match.canonical === 'Dominion';
      }
      return normalized === 'dominion';
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
