<template>
  <div class="content-start items-start">
    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Core"
    >
      <o-core />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Space"
    >
      <o-space />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Planet"
    >
      <o-planet />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Settlement"
    >
      <o-settlement />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Starship"
    >
      <o-starship />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Character"
    >
      <o-NPC />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Creature"
    >
      <o-creature />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Derelict"
    >
      <o-derelict />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Vault"
    >
      <o-vault />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Faction"
    >
      <o-faction />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Location Theme"
    >
      <o-location-theme />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Misc"
    >
      <o-misc />
    </q-expansion-item>

    <q-expansion-item
      class="shadow-1 overflow-hidden oracles q-mb-sm"
      style="border-radius: 4px"
      header-class="text-h6"
      label="Custom"
    >
      <o-custom @new="addOracle" @edit="editOracle" />
    </q-expansion-item>

    <q-dialog v-model="showEditor" :maximized="$q.platform.is.mobile">
      <o-editor @close="showEditor = false" :oracle="editorData" />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import OSpace from './OSpace.vue';
import OPlanet from './OPlanet.vue';
import OSettlement from './OSettlement.vue';
import OStarship from './OStarship.vue';
import ODerelict from './ODerelict.vue';
import OCreature from './OCreature.vue';
import OCore from './OCore.vue';
import OVault from './OVault.vue';
import ONPC from './ONPC.vue';
import OFaction from './OFaction.vue';
import OLocationTheme from './OLocationTheme.vue';
import OMisc from './OMisc.vue';
import OCustom from './OCustom.vue';
import { ICustomOracle } from '../models';
import { NewCustomOracle } from 'src/lib/oracles';
import { useOracles } from 'src/store/oracles';
import OEditor from './OEditor.vue';

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
    OFaction,
    OLocationTheme,
    OMisc,
    OCustom,
    OEditor,
  },
  setup() {
    const showEditor = ref(false);
    const editorData = ref(<ICustomOracle>{});
    const addOracle = () => {
      editorData.value = NewCustomOracle('Custom Oracle');
      showEditor.value = true;
    };
    const editOracle = (id: string) => {
      editorData.value = useOracles().data.find((o) => o.$id === id) as ICustomOracle;
      showEditor.value = true;
    };

    return {
      showEditor,
      editorData,
      addOracle,
      editOracle,
    };
  },
});
</script>

<style lang="sass">
.oracles
  background: #604d6966
</style>
