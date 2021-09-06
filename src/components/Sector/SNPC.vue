<template>
  <div>
    <q-expansion-item header-class="person-header text-h5 custom-header rounded-borders shadow-1 q-mb-sm" :label="data.name" caption="Person">
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col" label="Name" v-model="data.name" />
        <i-input class="col" label="Callsign" v-model="data.callsign" />
        <i-input class="col" label="Role" v-model="data.role" />
        <q-checkbox class="col-shrink" dense label="Bond" v-model="data.bond" />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" label="Disposition" v-model="data.disposition" />
        <i-input class="col" label="Goal" v-model="data.goal" />
      </div>

      <i-input class="q-mb-sm" label="First Look" v-model="data.firstLook" />
      <i-input class="q-mb-sm" label="Revealed Aspect" v-model="data.aspect" />

      <progress-track v-model="data.track" :showMenaceBtn="false" :showName="false" />

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch } from 'vue';
import IInput from '../IInput.vue';
import { INPC } from '../models';
import ProgressTrack from '../Tracks/ProgressTrack.vue';
export default defineComponent({
  components: { IInput, ProgressTrack },
  name: 'SNPC',
  props: {
    modelValue: {
      type: Object as PropType<INPC>,
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
.person-header
  background-color: $person
  text-shadow: 1px 1px 1px $dark-page
</style>
