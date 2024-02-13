<template>
  <!-- file deepcode ignore PureFunctionReturnValueIgnored: value passed to component -->
  <div>
    <q-expansion-item
      :icon="`img:${icon.starship()}`"
      header-class="starship-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      caption="Starship"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap items-baseline">
        <i-input class="col" label="Name" v-model="data.name" />
        <i-input class="col" label="Class" v-model="data.class" />
        <i-input class="col" label="Fleet" v-model="data.fleet" />
        <q-select class="col" label="Faction" v-model="faction" :options="campaignFactionNames" />
        <q-btn v-if="app.config.edit" icon="delete" flat dense @click="$emit('delete')" />
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
import { defineComponent, PropType, ref, watch, computed } from 'vue';

import { IFaction, IStarship } from '../models';

import { useCampaign } from 'src/store/campaign';

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
    const app = useCampaign();

    const faction = computed({
      /**
       * Gets or sets the underlying data.faction IFaction. The IFaction will be identified by the name.
       */
      get() {
        if (data.value.factionId === '' || data.value.factionId === undefined) {
          // The faction is either not set yet, or was deleted.
          return 'None';
        }

        const factionForId = getFactionForId(data.value.factionId);

        if (!factionForId) {
          return 'None';
        }

        return factionForId.name;
      },

      set(value: string) {
        if (value === 'None') {
          // The user has unassigned the faction of the ship.
          data.value.factionId = '';
        } else {
          // Find the IFaction that matches the name of the faction given.
          const factionForSelectedName = getFactionForName(value);

          if (!factionForSelectedName) {
            // Fallback: A faction for the given name couldn't be found. This is most likely a bug.
            data.value.factionId = '';
          } else {
            data.value.factionId = factionForSelectedName.id;
          }
        }
        return true;
      },
    });

    const campaignFactionNames = () => {
      /**
       * Get the names of the factions in the campaign.
       */
      const factionNames = app.ca.factions.map((x) => x.name);

      if (factionNames.length == 0) {
        // This campaign has no factions created yet.
        return ['None'];
      }

      // Always add 'None' as an option to the array.
      factionNames.unshift('None');
      return factionNames;
    };

    const getFactionForName = function (factionName: string) {
      return app.ca.factions.find((x) => x.name === factionName) as IFaction;
    };
    const getFactionForId = function (factionId: string) {
      return app.ca.factions.find((x) => x.id === factionId) as IFaction;
    };

    // Older saves may not have this value set. Set it to a default, if it is undefined.
    if (data.value.factionId === undefined) {
      data.value.factionId = '';
    }

    return {
      data,
      app,
      icon,
      faction,
      campaignFactionNames,
      getFactionForName,
      getFactionForId,
    };
  },
});
</script>

<style lang="sass">
.starship-header
  background-color: $ship
  text-shadow: 1px 1px 1px $dark-page
</style>
