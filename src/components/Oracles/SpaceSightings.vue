<template>
  <div class="column">
    <div class="text-h6">Space Sightings</div>
    <div class="row full-width items-baseline q-mb-md">
      <q-select
        class="col-grow"
        label="Region"
        v-model="regionSelect"
        :options="Object.values(ERegion)"
        dense
      />
      <q-btn
        class="col-shrink"
        icon="mdi-dice-6"
        flat
        dense
        @click="rollSighting"
      />
    </div>
    <div class="text-h6">{{ rollResult }}</div>
    <div v-if="rollResult === ESighting.StellarObject">
      {{ tableRoll(StellarObject) }}
    </div>
    <planet
      v-if="rollResult === ESighting.Planet"
      :modelValue="RollPlanet(regionSelect)"
    />
    <settlement
      v-if="rollResult === ESighting.Settlement"
      :modelValue="RollSettlement(regionSelect)"
    />
    <starship
      v-if="rollResult === ESighting.Starship"
      :modelValue="RollStarship(regionSelect)"
    />
    <derelict
      v-if="rollResult === ESighting.Derelict"
      :modelValue="RollDerelict()"
    />
    <creature
      v-if="rollResult === ESighting.Creature"
      :modelValue="RollCreature()"
    />
    <vault v-if="rollResult === ESighting.Vault" :modelValue="RollVault()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Sighting, StellarObject } from 'src/lib/oracles/space';
import { ERegion, ESighting, EPClass } from 'src/components/models';
import { sightingRoll, tableRoll } from 'src/lib/roll';
import { RollPlanet } from 'src/lib/oracles/planets';
import { RollSettlement } from 'src/lib/oracles/settlement';
import { RollStarship } from 'src/lib/oracles/starship';
import { RollDerelict } from 'src/lib/oracles/derelict';
import { RollCreature } from 'src/lib/oracles/creature';
import { RollVault } from 'src/lib/oracles/vault';

import Planet from 'src/components/Oracles/Planet.vue';
import Settlement from 'src/components/Oracles/Settlement.vue';
import Starship from 'src/components/Oracles/Starship.vue';
import Derelict from 'src/components/Oracles/Derelict.vue';
import Creature from 'src/components/Oracles/Creature.vue';
import Vault from './Vault.vue';

export default defineComponent({
  name: 'SpaceSightings',
  components: { Planet, Settlement, Starship, Derelict, Creature, Vault },
  setup() {
    const regionSelect = ref(ERegion.Terminus);
    const rollResult = ref('');
    const rollSighting = () => {
      rollResult.value = '';
      rollResult.value = sightingRoll(Sighting, regionSelect.value);
    };

    return {
      Sighting,
      StellarObject,
      ERegion,
      ESighting,
      EPClass,
      regionSelect,

      rollResult,
      rollSighting,
      tableRoll,

      RollPlanet,
      RollSettlement,
      RollStarship,
      RollDerelict,
      RollCreature,
      RollVault,
    };
  },
});
</script>
