<template>
  <div class="row items-center">
    <q-select class="col-grow" label="Type" v-model="data.type" :options="tableOpts(Faction.type)" dense />
    <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="Roll.Type" />
  </div>
  <o-input label="Name" v-model="data.name" @roll="Roll.Name" />
  <o-input label="Influence" v-model="data.influence" @roll="Roll.Inf" />
  <o-input
    v-if="data.type == 'Dominion'"
    label="Sphere"
    v-model="data.sphere"
    @roll="Roll.Sphere"
    reroll
    :maxRerolls="3"
  />
  <o-input v-else label="Sphere" v-model="data.sphere" @roll="Roll.Sphere" />
  <o-input
    v-if="data.leadership || data.type == 'Dominion'"
    label="Leadership"
    v-model="data.leadership"
    @roll="Roll.Lead"
  />
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { Faction } from 'src/lib/oracles/faction';
import { NewFaction } from 'src/lib/campaign';
import { tableOpts } from 'src/lib/util';
import { tableRoll } from 'src/lib/roll';
import { v4 as uuid } from 'uuid';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  name: 'OFaction',
  components: { OInput, OBtns },
  setup() {
    const data = ref(NewFaction());

    const Roll = {
      Type: () => {
        data.value.type = tableRoll(Faction.type);
      },
      Name: () => {
        let format = tableRoll(Faction.name_template);

        const matches = ['Legacy', 'Affiliation', 'Identity'];
        matches.forEach((m) => {
          format = format.replace(m, tableRoll(Faction[m.toLowerCase()]));
        });

        format = format.replace(/[\[\]]/g, '');
        data.value.name = format;
      },
      Inf: () => (data.value.influence = tableRoll(Faction.influence)),
      Sphere: () => {
        data.value.type == 'Dominion'
          ? (data.value.sphere += ', ' + tableRoll(Faction[data.value.type.toLowerCase().replace(' ', '_')]))
          : (data.value.sphere = tableRoll(Faction[data.value.type.toLowerCase().replace(' ', '_')]));

        data.value.sphere = data.value.sphere.replace(/^, /, '');
      },
      Lead: () => (data.value.leadership = tableRoll(Faction.leadership)),
      Proj: () => {
        const p = tableRoll(Faction.projects);
        data.value.projects ? (data.value.projects += ', ' + p) : (data.value.projects = p);
      },
      Rel: () => (data.value.relationships = tableRoll(Faction.relationships)),
      Quirks: () => {
        const q = tableRoll(Faction.quirks);
        data.value.quirks ? (data.value.quirks += ', ' + q) : (data.value.quirks = q);
      },
      Rumours: () => {
        const r = tableRoll(Faction.rumors);
        data.value.rumors ? (data.value.rumors += ', ' + r) : (data.value.rumors = r);
      },
    };

    const btns = {
      Clear: () => {
        data.value = NewFaction();
      },
      Initial: () => {
        data.value.id = uuid();
        Roll.Type();
        Roll.Name();
        Roll.Inf();
        Roll.Sphere();
        if (data.value.type == 'Dominion') Roll.Lead();
      },
      Save: () => {
        // Do stuff
      },
    };

    return {
      data,
      Roll,
      btns,
      tableOpts,
      Faction,
    };
  },
});
</script>
