<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select class="col-grow" label="Region" v-model="regionSelect" :options="Object.values(ERegion)" dense />
    </div>

    <o-input label="Name" v-model="data.name" @roll="roll.Name" />

    <o-input label="Class" v-model="data.class" @roll="roll.Class" />

    <o-input label="Fleet" v-model="data.fleet" @roll="roll.Fleet" />

    <o-input label="Initial Contact" v-model="data.initialContact" @roll="roll.Cont" />

    <o-input label="First Look" v-model="data.firstLook" @roll="roll.First" reroll />

    <o-input label="Mission" v-model="data.mission" @roll="roll.Mission" />

    <o-btns save @save="btns.Save" initial @initial="btns.Initial" clear @clear="btns.Clear" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { ERegion, IStarship } from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import * as oracle from 'src/lib/oracles';
import { NewShip } from 'src/lib/sector';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'OStarship',
  setup() {
    const data = ref(NewShip());
    const regionSelect = ref(ERegion.Terminus);

    const roll = {
      Name: () => {
        data.value.name = oracle.roll(['Starships', 'Name']);
      },
      Class: () => {
        let c = oracle.roll(['Starships', 'Type']);
        c = /Fleet/i.test(c) ? `Fleet: ${oracle.roll(['Starships', 'Fleet'])}` : c;
        c = /Starship Mission/i.test(c)
          ? `Starship Mission: ${oracle.roll(['Starships', 'Mission', regionSelect.value])}`
          : c;
        data.value.class = c;
      },
      Fleet: () => {
        data.value.fleet = oracle.roll(['Starships', 'Fleet']);
      },
      Cont: () => {
        data.value.initialContact = oracle.roll(['Starships', 'Initial Contact']);
      },
      First: () => {
        const f = oracle.roll(['Starships', 'First Look']);
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Mission: () => {
        data.value.mission = oracle.roll(['Starships', 'Mission', regionSelect.value]);
      },
    };

    const btns = {
      Clear: () => {
        data.value = <IStarship>{};
      },
      Initial: () => {
        btns.Clear();
        roll.Name();
        roll.Class();
        roll.First();
      },
      Save: (args: { sector: number; cell: number }) => {
        const storeCopy = JSON.parse(JSON.stringify(data.value)) as IStarship;
        useCampaign().data.sectors[args.sector].cells[args.cell].ships.unshift(storeCopy);
      },
    };

    return {
      data,
      regionSelect,
      ERegion,

      roll,
      btns,
    };
  },
});
</script>
