<template>
  <div>
    <q-expansion-item icon="img:icons/space/spaceship.svg" header-class="starship-header text-h5 custom-header rounded-borders shadow-1 q-mb-sm" :label="data.name" caption="Starship">
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col" label="Name" v-model="data.name" />
        <i-input class="col" label="Class" v-model="data.class" />
        <i-input class="col" label="Fleet" v-model="data.fleet" />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <i-input class="q-mb-sm" label="First Look" v-model="data.firstLook" />

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" label="Initial Contact" v-model="data.initialContact" />
        <i-input class="col" label="Mission" v-model="data.mission" />
      </div>

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch } from 'vue';
import IInput from '../IInput.vue';
import { IStarship } from '../models';
export default defineComponent({
  components: { IInput },
  name: 'SStarship',
  props: {
    modelValue: {
      type: Object as PropType<IStarship>,
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
    };
  },
});
</script>

<style lang="sass">
.starship-header
  background-color: $ship
  text-shadow: 1px 1px 1px $dark-page
</style>
