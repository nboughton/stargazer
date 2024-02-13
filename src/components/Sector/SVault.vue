<template>
  <!-- file deepcode ignore PureFunctionReturnValueIgnored: value passed to component -->
  <div>
    <q-expansion-item
      :icon="`img:${icon.vault()}`"
      header-class="vault-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      caption="Vault"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" label="Name" v-model="data.name" />
        <q-select
          class="col-shrink"
          label="Type"
          v-model="data.location"
          :options="Object.values(ESLocation)"
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn v-if="app.config.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Scale" v-model="data.scale" />
        <i-input class="col" label="Form" v-model="data.form" />
        <i-input class="col" label="Shape" v-model="data.shape" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" label="Scale" v-model="data.scale" />
        <i-input class="q-mb-sm" label="Form" v-model="data.form" />
        <i-input class="q-mb-sm" label="Shape" v-model="data.shape" />
      </div>

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';

import { IVault, ESLocation } from '../models';

import { useCampaign } from 'src/store/campaign';

import { icon } from 'src/lib/icons';

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

    const app = useCampaign();

    return {
      data,
      app,
      ESLocation,
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
