<template>
  <div>
    <q-expansion-item :icon="icon.vault()" header-class="vault-header text-h5 custom-header rounded-borders shadow-1 q-mb-sm" :label="data.name" caption="Vault">
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" label="Name" v-model="data.name" />
        <q-select class="col-shrink" label="Type" v-model="data.location" :options="Object.values(ESLocation)" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
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

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useConfig } from 'src/store/config';
import { defineComponent, ref, PropType, watch } from 'vue';
import Controls from './Controls.vue';
import IInput from '../IInput.vue';
import { IVault, ESLocation } from '../models';
import { icon } from 'src/lib/icons';
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
    const $q = useQuasar();

    return {
      $q,
      data,
      config,
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
