<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select
        class="col-grow"
        label="Type"
        v-model="data.type"
        :options="oracle.values('Starforged/Oracles/Factions/Type')"
        dense
      />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="Roll.Type" />
    </div>
    <o-input label="Name" v-model="data.name" @roll="Roll.Name" />
    <o-input label="Influence" v-model="data.influence" @roll="Roll.Inf" />
    <o-input v-if="isDominion" label="Sphere" v-model="data.sphere" @roll="Roll.Sphere" reroll :maxRerolls="3" />
    <o-input v-else label="Sphere" v-model="data.sphere" @roll="Roll.Sphere" />
    <o-input v-if="isDominion" label="Leadership" v-model="data.leadership" @roll="Roll.Lead" />
    <o-input label="Projects" v-model="data.projects" @roll="Roll.Proj" reroll />
    <o-input label="Relationships" v-model="data.relationships" @roll="Roll.Rel" />
    <o-input label="Quirks" v-model="data.quirks" @roll="Roll.Quirks" reroll />
    <o-input label="Rumours" v-model="data.rumors" @roll="Roll.Rumours" reroll />

    <div class="row items-center">
      <div class="col-8">
        <o-btns clear @clear="btns.Clear" initial @initial="btns.Initial" />
      </div>
      <div class="col-4 q-mt-md">
        <q-btn icon="save" flat @click="btns.Save" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import { IFaction } from '../models';

import { useCampaign } from 'src/store/campaign';

import * as oracle from 'src/lib/oracles';
import { NewFaction } from 'src/lib/campaign';
import { v4 as uuid } from 'uuid';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';
import { mdToText } from 'src/lib/util';

export default defineComponent({
  name: 'OFaction',
  components: { OInput, OBtns },
  setup() {
    const data = ref(NewFaction());

    const isDominion = computed((): boolean => data.value.type === 'Dominion');

    const Roll = {
      Type: () =>
        (data.value.type = mdToText(oracle.roll('Starforged/Oracles/Factions/Type')).replace(/[^a-z ]/gi, '')),
      Name: () => {
        let format = mdToText(oracle.roll('Starforged/Oracles/Factions/Name_Template'));

        const matches = ['Legacy', 'Affiliation', 'Identity'];
        matches.forEach((m) => {
          format = format.replace(m, oracle.roll(`Starforged/Oracles/Factions/${m}`));
        });

        format = format.replace(/[^a-z ]/gi, '');
        data.value.name = format;
      },
      Inf: () => (data.value.influence = oracle.roll('Starforged/Oracles/Factions/Influence')),
      Sphere: () => {
        isDominion.value
          ? (data.value.sphere +=
              ', ' + oracle.roll(`Starforged/Oracles/Factions/${data.value.type.replace(' ', '_')}`))
          : (data.value.sphere = oracle.roll(`Starforged/Oracles/Factions/${data.value.type.replace(' ', '_')}`));

        data.value.sphere = data.value.sphere.replace(/^, /, '');
      },
      Lead: () => (data.value.leadership = oracle.roll('Starforged/Oracles/Factions/Leadership')),
      Proj: () => {
        const p = oracle.roll('Starforged/Oracles/Factions/Projects');
        data.value.projects ? (data.value.projects += ', ' + p) : (data.value.projects = p);
      },
      Rel: () => (data.value.relationships = oracle.roll('Starforged/Oracles/Factions/Relationships')),
      Quirks: () => {
        const q = oracle.roll('Starforged/Oracles/Factions/Quirks');
        data.value.quirks ? (data.value.quirks += ', ' + q) : (data.value.quirks = q);
      },
      Rumours: () => {
        const r = oracle.roll('Starforged/Oracles/Factions/Rumors');
        data.value.rumors ? (data.value.rumors += ', ' + r) : (data.value.rumors = r);
      },
    };

    const btns = {
      Clear: () => {
        data.value = NewFaction();
      },
      Initial: () => {
        btns.Clear();
        data.value.id = uuid();
        Roll.Type();
        Roll.Name();
        Roll.Inf();
        Roll.Sphere();
        if (isDominion.value) Roll.Lead();
      },
      Save: () => {
        const storeCopy = JSON.parse(JSON.stringify(data.value)) as IFaction;
        useCampaign().data.factions.push(storeCopy);
      },
    };

    return {
      data,
      Roll,
      btns,
      oracle,
      isDominion,
    };
  },
});
</script>
