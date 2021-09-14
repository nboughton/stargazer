<template>
  <div class="content-start items-start">
    <q-expansion-item header-class="text-h6" label="Core">
      <o-core />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Space">
      <o-space />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Planet">
      <o-planet />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Settlement">
      <o-settlement />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Starship">
      <o-starship />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Character">
      <o-NPC />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Creature">
      <o-creature />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Derelict">
      <o-derelict />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Vault">
      <o-vault />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Location Theme">
      <o-location-theme />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import OSpace from './OSpace.vue';
import OPlanet from './OPlanet.vue';
import OSettlement from './OSettlement.vue';
import OStarship from './OStarship.vue';
import ODerelict from './ODerelict.vue';
import OCreature from './OCreature.vue';
import OCore from './OCore.vue';
import OVault from './OVault.vue';
import ONPC from './ONPC.vue';
import OLocationTheme from './OLocationTheme.vue';

export default defineComponent({
  name: 'Oracles',
  components: {
    OSpace,
    OCore,
    OCreature,
    OPlanet,
    OSettlement,
    OStarship,
    ODerelict,
    OVault,
    ONPC,
    OLocationTheme,
  },
});
</script>
