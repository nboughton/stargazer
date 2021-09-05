<template>
  <div class="content-start items-start">
    <q-expansion-item header-class="text-h5 custom-header" label="Core">
      <o-core />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Space">
      <o-space />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Planet">
      <o-planet />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Settlement">
      <o-settlement />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Starship">
      <o-starship />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Character">
      <o-NPC />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Creature">
      <o-creature />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Derelict">
      <o-derelict />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Vault">
      <o-vault />
    </q-expansion-item>

    <q-expansion-item header-class="text-h5 custom-header" label="Location Theme">
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
