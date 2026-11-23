<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.starship()}`"
      header-class="starship-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      :caption="$t('oracles.categories.starship')"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap items-baseline">
        <i-input class="col" :label="$t('common.name')" v-model="data.name" />
        <i-input class="col" :label="$t('oracles.fields.class')" v-model="data.class" />
        <i-input class="col" :label="$t('oracles.fields.fleet')" v-model="data.fleet" />
        <q-select
          v-if="$q.screen.gt.sm"
          class="col"
          :label="$t('oracles.categories.faction')"
          v-model="faction"
          :options="campaignFactionOpts"
          map-options
          emit-value
          dense
          standout
        />
        <q-btn v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb items-baseline" v-if="$q.screen.lt.md">
        <i-input class="col q-mb-sm" :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" />
        <q-select class="col" :label="$t('oracles.categories.faction')" v-model="faction" :options="campaignFactionOpts" map-options emit-value dense standout />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" />
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col" :label="$t('oracles.fields.initialContact')" v-model="data.initialContact" />
        <i-input class="col" :label="$t('oracles.fields.mission')" v-model="data.mission" />
      </div>

      <i-input class="q-mb-sm" :label="$t('common.notes')" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { IStarship } from '../models';

import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';

import Controls from './Controls.vue';
import IInput from '../Widgets/IInput.vue';

export default defineComponent({
  components: { IInput, Controls },
  name: 'SStarship',
  props: {
    modelValue: {
      type: Object as PropType<IStarship>,
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

    const { t } = useI18n();

    const faction = computed({
      get(): string {
        if (!data.value.factionId) {
          return '';
        }
        return useCampaign().data.factions.some((x) => x.id === data.value.factionId)
          ? data.value.factionId
          : '';
      },

      set(value: string) {
        data.value.factionId = value || '';
      },
    });

    const campaignFactionOpts = computed((): Array<{ label: string; value: string }> => [
      { label: t('common.none'), value: '' },
      ...useCampaign().data.factions.map((x) => ({ label: x.name, value: x.id })),
    ]);

    // Older saves may not have this value set. Set it to a default, if it is undefined.
    if (data.value.factionId === undefined) data.value.factionId = '';

    const config = useConfig();
    return {
      data,
      config,
      icon,
      faction,
      campaignFactionOpts,
    };
  },
});
</script>

<style lang="sass">
.starship-header
  background-color: $ship
  text-shadow: 1px 1px 1px $dark-page
</style>
