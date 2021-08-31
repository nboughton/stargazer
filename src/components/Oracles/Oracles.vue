<template>
  <div class="content-start items-start">
    <q-expansion-item header-class="text-h6" label="Core">
      <core />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Character">
      <character />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Space">
      <space />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Planet">
      <planet />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Settlement">
      <settlement />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Starship">
      <starship />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Creature">
      <creature />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Derelict">
      <derelict />
    </q-expansion-item>

    <q-expansion-item header-class="text-h6" label="Vault">
      <vault />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Space from './Space.vue';
import Planet from './Planet.vue';
import Settlement from './Settlement.vue';
import Starship from './Starship.vue';
import Derelict from './Derelict.vue';
import Creature from './Creature.vue';
import Core from './Core.vue';
import Vault from './Vault.vue';
import Character from './Character.vue';

export default defineComponent({
  name: 'Oracles',
  components: {
    Space,
    Core,
    Creature,
    Planet,
    Settlement,
    Starship,
    Derelict,
    Vault,
    Character,
  },
});
</script>
