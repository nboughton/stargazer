<template>
  <div>
    <q-expansion-item header-class="planet-header text-h5 custom-header rounded-borders shadow-1 q-mb-sm" :label="data.name" caption="Planet">
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" label="Name" v-model="data.name" />
        <q-select label="Type" v-model="data.type" :options="Object.values(EPClass)" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>
      <i-input class="q-mb-sm" label="Description" v-model="data.description" autogrow />
      <div class="row q-gutter-sm justify-between q-mb-sm">
        <i-input class="col" label="Atmosphere" v-model="data.atmosphere" />
        <i-input class="col" label="Life" v-model="data.life" />
        <i-input class="col" label="Settlements" v-model="data.settlements" />
      </div>
      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" label="Observed from Space" v-model="data.observed" />
        <i-input class="col" label="Planetside Features" v-model="data.feature" />
      </div>
      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch } from 'vue';
import IInput from '../IInput.vue';
import { IPlanet, EPClass } from '../models';
export default defineComponent({
  components: { IInput },
  name: 'SPlanet',
  props: {
    modelValue: {
      type: Object as PropType<IPlanet>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'delete'],
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
      EPClass,
    };
  },
});
</script>

<style lang="sass">
.planet-header
  background-color: $planet
  text-shadow: 1px 1px 1px $dark-page
</style>
