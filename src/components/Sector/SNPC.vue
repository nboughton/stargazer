<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.npc()}`"
      header-class="person-header sf-header rounded-borders q-mb-sm"
      :label="`${data.name} ${pronouns}`"
      caption="Person"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap" v-if="$q.screen.gt.xs">
        <i-input class="col" label="Name" v-model="data.name" />
        <i-input class="col" label="Pronouns" v-model="data.pronouns" />
        <i-input class="col" label="Role" v-model="data.role" />
        <q-checkbox class="col-shrink" dense label="Connection" v-model="data.connection" />
        <q-checkbox v-if="data.connection" class="col-shrink" dense label="Bond" v-model="data.bond" />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>
      <div v-else>
        <div class="row q-gutter-sm q-mb-sm no-wrap">
          <i-input class="col" label="Name" v-model="data.name" />
          <q-checkbox class="col-shrink" dense label="Bond" v-model="data.bond" />
          <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
        </div>

        <div class="row q-gutter-sm q-mb-sm">
          <i-input class="col" label="Pronouns" v-model="data.pronouns" />
          <i-input class="col" label="Role" v-model="data.role" />
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" label="Callsign" v-model="data.callsign" />
        <i-input class="col" label="Disposition" v-model="data.disposition" />
        <i-input class="col" label="Goal" v-model="data.goal" />
      </div>

      <i-input class="q-mb-sm" label="First Look" v-model="data.firstLook" />
      <i-input class="q-mb-sm" label="Revealed Aspect" v-model="data.aspect" />

      <i-input class="q-mb-sm" label="Notes" v-model="data.notes" autogrow />

      <progress-track v-if="data.connection" class="q-mb-sm" v-model="data.track" />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch, computed } from 'vue';
import { INPC } from '../models';
import ProgressTrack from '../Tracks/ProgressTrack.vue';
import Controls from './Controls.vue';
import IInput from '../IInput.vue';
import { icon } from 'src/lib/icons';

export default defineComponent({
  components: { IInput, ProgressTrack, Controls },
  name: 'SNPC',
  props: {
    modelValue: {
      type: Object as PropType<INPC>,
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

    const pronouns = computed((): string => {
      return data.value.pronouns ? '(' + data.value.pronouns + ')' : '';
    });

    const config = useConfig();

    // Older saves may not have a value for connection stored. In this case it will be undefined.
    // New NPCs and existing ones, where this flag isn't set explicitly, will be treated as connections.
    if (data.value.connection === undefined) {
      data.value.connection = true;
    }

    return {
      data,
      config,
      icon,
      pronouns,
    };
  },
});
</script>

<style lang="sass">
.person-header
  background-color: $person
  text-shadow: 1px 1px 1px $dark-page
</style>
