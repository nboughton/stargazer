<template>
  <div>
    <q-expansion-item header-class="creature-header text-h5 custom-header rounded-borders shadow-1 q-mb-sm" :label="data.name" caption="Creature">
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col" label="Name" v-model="data.name" />
        <i-input class="col" label="Scale" v-model="data.scale" />
        <q-select class="col" label="Environment" v-model="data.environment" :options="Object.values(EEnv)" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense />
        <q-btn class="col-shrink" v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" label="Form" v-model="data.form" />
        <i-input class="col" label="First Look" v-model="data.firstLook" />
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" label="Observed Behaviour" v-model="data.behaviour" />
        <i-input class="col" label="Revealed Aspet" v-model="data.aspect" />
      </div>

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch } from 'vue';
import IInput from '../IInput.vue';
import { ICreature, EEnv } from '../models';
export default defineComponent({
  components: { IInput },
  name: 'SCreature',
  props: {
    modelValue: {
      type: Object as PropType<ICreature>,
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
      EEnv,
    };
  },
});
</script>

<style lang="sass">
.creature-header
  background-color: $creature
  text-shadow: 1px 1px 1px $dark-page
</style>
