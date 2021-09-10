<template>
  <div>
    <q-expansion-item :icon="icon" header-class="planet-header text-h5 custom-header rounded-borders shadow-1 q-mb-sm" :label="data.name" caption="Planet">
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col-grow" label="Name" v-model="data.name" />
        <q-select label="Type" v-model="data.type" :options="Object.values(EPClass)" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <i-input class="q-mb-sm" label="Description" v-model="data.description" autogrow />

      <div class="row q-gutter-sm justify-between q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Atmosphere" v-model="data.atmosphere" />
        <i-input class="col" label="Life" v-model="data.life" />
        <i-input class="col" label="Settlements" v-model="data.settlements" />
      </div>
      <div v-else>
        <div class="row q-gutter-sm justify-between q-mb-sm">
          <i-input class="col" label="Atmosphere" v-model="data.atmosphere" />
          <i-input class="col" label="Life" v-model="data.life" />
        </div>

        <i-input class="q-mb-sm" label="Settlements" v-model="data.settlements" />
      </div>

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Observed from Space" v-model="data.observed" />
        <i-input class="col" label="Planetside Features" v-model="data.feature" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" label="Observed from Space" v-model="data.observed" />
        <i-input class="q-mb-sm" label="Planetside Features" v-model="data.feature" />
      </div>

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch, computed } from 'vue';
import Controls from './Controls.vue';
import IInput from '../IInput.vue';
import { IPlanet, EPClass } from '../models';
export default defineComponent({
  components: { IInput, Controls },
  name: 'SPlanet',
  props: {
    modelValue: {
      type: Object as PropType<IPlanet>,
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

    const icon = computed((): string => {
      return `img:icons/planets/${data.value.type.toLowerCase()}.png`;
    });
    return {
      $q,
      data,
      config,
      EPClass,
      icon,
    };
  },
});
</script>

<style lang="sass">
.planet-header
  background-color: $planet
  text-shadow: 1px 1px 1px $dark-page
</style>
