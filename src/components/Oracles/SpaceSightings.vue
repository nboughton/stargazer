<template>
  <div class="column">
    <div class="text-h6">Space Sightings</div>
    <div class="row full-width items-center q-mb-md">
      <q-select
        class="col-grow"
        label="Region"
        v-model="regionSelect"
        :options="Object.values(ERegion)"
        dense
      />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="roll" />
      <q-btn
        class="col-shrink"
        icon="clear"
        flat
        dense
        @click="rollResult = ''"
      />
    </div>
    <div class="text-h6">{{ rollResult }}</div>
    <div v-if="rollResult === ESighting.StellarObject">
      {{ tableRoll(Space.stellarObject) }}
    </div>
    <div v-if="rollResult === ESighting.DescFoc">
      {{ tableRoll(Core.descriptor) }} {{ tableRoll(Core.focus) }}
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
      :modelValue="RollCreature(EEnv.Space)"
    />
    <vault v-if="rollResult === ESighting.Vault" :modelValue="RollVault()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Core } from 'src/lib/oracles/core';
import { Space, RollSighting } from 'src/lib/oracles/space';
import { ERegion, ESighting, EPClass, EEnv } from 'src/components/models';
import { tableRoll } from 'src/lib/roll';
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
    const roll = () => {
      rollResult.value = '';
      rollResult.value = RollSighting(regionSelect.value);
    };

    return {
      Core,
      Space,
      ERegion,
      ESighting,
      EPClass,
      EEnv,
      regionSelect,

      rollResult,
      roll,
      tableRoll,

      RollSighting,
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
