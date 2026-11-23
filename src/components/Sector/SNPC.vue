<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.npc()}`"
      header-class="person-header sf-header rounded-borders q-mb-sm"
      :label="`${data.name} ${pronouns}`"
      :caption="$t('enums.sectorItem.Person')"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap" v-if="$q.screen.gt.xs">
        <i-input class="col" :label="$t('common.name')" v-model="data.name" />
        <i-input class="col" :label="$t('character.pronouns')" v-model="data.pronouns" />
        <i-input class="col" :label="$t('oracles.fields.role')" v-model="data.role" />
        <q-checkbox class="col-shrink" dense :label="$t('sector.connection')" v-model="data.connection" />
        <q-checkbox v-if="data.connection" class="col-shrink" dense :label="$t('sector.bond')" v-model="data.bond" />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>
      <div v-else>
        <div class="row q-gutter-sm q-mb-sm no-wrap">
          <i-input class="col" :label="$t('common.name')" v-model="data.name" />
          <q-checkbox class="col-shrink" dense :label="$t('sector.connection')" v-model="data.connection" />
          <q-checkbox v-if="data.connection" class="col-shrink" dense :label="$t('sector.bond')" v-model="data.bond" />
          <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
        </div>

        <div class="row q-gutter-sm q-mb-sm">
          <i-input class="col" :label="$t('character.pronouns')" v-model="data.pronouns" />
          <i-input class="col" :label="$t('oracles.fields.role')" v-model="data.role" />
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" :label="$t('character.callsign')" v-model="data.callsign" />
        <i-input class="col" :label="$t('oracles.fields.disposition')" v-model="data.disposition" />
        <i-input class="col" :label="$t('oracles.fields.goal')" v-model="data.goal" />
      </div>

      <i-input class="q-mb-sm" :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" />
      <i-input class="q-mb-sm" :label="$t('oracles.fields.revealedAspect')" v-model="data.aspect" />

      <i-input class="q-mb-sm" :label="$t('common.notes')" v-model="data.notes" autogrow />

      <q-expansion-item class="q-mb-sm" header-class="sf-header" :label="$t('sector.challengeTracks')" ref="challenge_tracks">
        <progress-track class="q-mb-sm" v-model="data.track" />
      </q-expansion-item>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed, onMounted } from 'vue';

import { INPC } from '../models';

import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';
import { QExpansionItem } from 'quasar';

import ProgressTrack from '../Tracks/ProgressTrack.vue';
import Controls from './Controls.vue';
import IInput from '../Widgets/IInput.vue';

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
    const challenge_tracks = ref<QExpansionItem>();
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
    watch(
      () => data.value.connection,
      () => updateChallengeTracksVisibility()
    );

    const pronouns = computed((): string => {
      return data.value.pronouns ? '(' + data.value.pronouns + ')' : '';
    });

    const updateChallengeTracksVisibility = () => {
      if (challenge_tracks.value !== undefined) {
        // Check if the user has given the npc progress track a name.
        const nameOfTrackNotEmpty = data.value.track.name.trim() != '';

        // Check if the user has filled any of the boxes on this npcs progress track.
        const anyBoxesFilled = data.value.track.boxes.filter((x) => x > 0).length > 0;

        if (data.value.connection || anyBoxesFilled || nameOfTrackNotEmpty) {
          // Open the NPCs challenge tracks expansion item, if the NPC is a connection, the progress track has any boxes filled or has a name assigned.
          // This will do nothing, if the user has already expanded the challenge tracks expansion item.
          challenge_tracks.value.show();
        }
      }
    };

    onMounted(() => {
      // Update the NPCs challenge tracks expansion item visibility at the start.
      updateChallengeTracksVisibility();
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
      challenge_tracks,
    };
  },
});
</script>

<style lang="sass">
.person-header
  background-color: $person
  text-shadow: 1px 1px 1px $dark-page
</style>
