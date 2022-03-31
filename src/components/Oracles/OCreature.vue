<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select class="col-grow" label="Environment" v-model="data.environment" :options="Object.values(EEnv)" dense />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Env" />
    </div>

    <o-input label="Scale" v-model="data.scale" @roll="roll.Scale" />
    <o-input label="Basic Form" v-model="data.form" @roll="roll.Form" />
    <o-input label="First Look" v-model="data.firstLook" @roll="roll.First" reroll />
    <o-input label="Encountered Behaviour" v-model="data.behaviour" @roll="roll.Behave" />
    <o-input label="Revealed Aspect" v-model="data.aspect" @roll="roll.Aspect" reroll />

    <o-btns save @save="btns.Save" clear @clear="btns.Clear" initial @initial="btns.Initial" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { EEnv, ICreature } from '../models';

import { useCampaign } from 'src/store/campaign';

import { NewCreature } from 'src/lib/sector';
import * as oracle from 'src/lib/oracles';

import OBtns from './OBtns.vue';
import OInput from './OInput.vue';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'OCreature',
  setup() {
    const data = ref(NewCreature());

    const roll = {
      Env: () => {
        data.value.environment = oracle.roll(['Creatures', 'Environment']) as EEnv;
      },
      Scale: () => {
        let s = oracle.roll(['Creatures', 'Scale']);
        if (s === 'Ultra-scale') {
          s = oracle.roll(['Creatures', 'Ultra-scale']);
        }
        data.value.scale = s;
      },
      Form: () => {
        data.value.form = oracle.roll(['Creatures', 'Basic Form', data.value.environment]);
      },
      First: () => {
        const f = oracle.roll(['Creatures', 'First Look']);
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Behave: () => {
        data.value.behaviour = oracle.roll(['Creatures', 'Encountered Behavior']);
      },
      Aspect: () => {
        const a = oracle.roll(['Creatures', 'Revealed Aspect']);
        data.value.aspect ? (data.value.aspect += ', ' + a) : (data.value.aspect = a);
      },
    };

    const btns = {
      Clear: () => {
        const env = data.value.environment;
        data.value = NewCreature(env);
      },
      Initial: () => {
        btns.Clear();
        roll.Scale();
        roll.Form();
        roll.First();
      },
      Save: (args: { sector: number; cell: number }) => {
        const storeCopy = JSON.parse(JSON.stringify(data.value)) as ICreature;
        useCampaign().data.sectors[args.sector].cells[args.cell].creatures.unshift(storeCopy);
      },
    };
    return {
      data,
      EEnv,

      roll,
      btns,
    };
  },
});
</script>
