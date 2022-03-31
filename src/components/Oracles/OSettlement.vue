<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select class="col-grow" label="Region" v-model="regionSelect" :options="Object.values(ERegion)" dense />
      <q-select class="col-grow" label="Location" v-model="data.location" :options="Object.values(ESLocation)" dense />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="roll.Loc" />
    </div>

    <o-input label="Name" v-model="data.name" @roll="roll.Name" />

    <div class="row items-center">
      <q-select
        class="col-grow"
        label="Population"
        v-model="data.population"
        :options="Object.values(ESettPop)"
        dense
      />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="roll.Pop" />
    </div>

    <o-input label="First Look" v-model="data.firstLook" @roll="roll.First" reroll />

    <o-input label="Initial Contact" v-model="data.initialContact" @roll="roll.Cont" />

    <o-input label="Authority" v-model="data.authority" @roll="roll.Auth" />

    <o-input label="Projects" v-model="data.projects" @roll="roll.Proj" reroll />

    <o-input label="Trouble" v-model="data.trouble" @roll="roll.Trouble" />

    <o-btns clear @clear="btns.Clear" initial @initial="btns.Initial" save @save="btns.Save" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { ISettlement, ESLocation, ERegion, ESettPop } from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import * as oracle from 'src/lib/oracles';
import { NewSettlement } from 'src/lib/sector';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'OSettlement',
  setup() {
    const data = ref(NewSettlement());
    const regionSelect = ref(ERegion.Terminus);

    const roll = {
      Loc: () => {
        data.value.location = oracle.roll(['Settlements', 'Location']) as ESLocation;
      },
      Name: () => {
        data.value.name = oracle.roll(['Settlements', 'Name']);
      },
      Pop: () => {
        data.value.population = oracle.roll(['Settlements', 'Population', regionSelect.value]);
      },
      First: () => {
        const f = oracle.roll(['Settlements', 'First Look']);
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Cont: () => {
        data.value.initialContact = oracle.roll(['Settlements', 'Initial Contact']);
      },
      Auth: () => {
        data.value.authority = oracle.roll(['Settlements', 'Authority']);
      },
      Proj: () => {
        const p = oracle.roll(['Settlements', 'Projects']);
        data.value.projects ? (data.value.projects += ', ' + p) : (data.value.projects = p);
      },
      Trouble: () => {
        data.value.trouble = oracle.roll(['Settlements', 'Trouble']);
      },
    };

    const btns = {
      Clear: () => {
        const loc = data.value.location;
        data.value = NewSettlement(loc);
      },
      Initial: () => {
        btns.Clear();
        roll.Name();
        roll.Pop();
        roll.First();
      },
      Save: (args: { sector: number; cell: number }) => {
        const storeCopy = JSON.parse(JSON.stringify(data.value)) as ISettlement;
        useCampaign().data.sectors[args.sector].cells[args.cell].settlements.unshift(storeCopy);
      },
    };

    return {
      data,
      regionSelect,
      ERegion,
      ESLocation,
      ESettPop,
      roll,
      btns,
    };
  },
});
</script>
