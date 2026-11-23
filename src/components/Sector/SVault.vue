<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.vault()}`"
      header-class="vault-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      :caption="$t('enums.sectorItem.Vault')"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" :label="$t('common.name')" v-model="data.name" />
        <q-select
          class="col-shrink"
          :label="$t('common.type')"
          v-model="data.location"
          :options="locOpts"
          map-options
          emit-value
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" :label="$t('oracles.fields.scale')" v-model="data.scale" />
        <i-input class="col" :label="$t('oracles.fields.form')" v-model="data.form" />
        <i-input class="col" :label="$t('oracles.fields.shape')" v-model="data.shape" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" :label="$t('oracles.fields.scale')" v-model="data.scale" />
        <i-input class="q-mb-sm" :label="$t('oracles.fields.form')" v-model="data.form" />
        <i-input class="q-mb-sm" :label="$t('oracles.fields.shape')" v-model="data.shape" />
      </div>

      <i-input class="q-mb-sm" :label="$t('common.notes')" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, PropType, watch } from 'vue';

import { IVault, ESLocation } from '../models';

import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';
import { enumOptions } from 'src/i18n';

import Controls from './Controls.vue';
import IInput from '../Widgets/IInput.vue';

export default defineComponent({
  components: { IInput, Controls },
  name: 'SVault',
  props: {
    modelValue: {
      type: Object as PropType<IVault>,
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
    const locOpts = computed(() => enumOptions(Object.values(ESLocation), 'enums.location'));

    return {
      data,
      config,
      ESLocation,
      locOpts,
      icon,
    };
  },
});
</script>

<style lang="sass">
.vault-header
  background-color: $vault
  text-shadow: 1px 1px 1px $dark-page
</style>
