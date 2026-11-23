<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select
        class="col-grow"
        :label="$t('oracles.fields.environment')"
        v-model="data.environment"
        :options="envOpts"
        map-options
        emit-value
        dense
      />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Env" />
    </div>

    <o-input :label="$t('oracles.fields.scale')" v-model="data.scale" @roll="roll.Scale" />
    <o-input :label="$t('oracles.fields.basicForm')" v-model="data.form" @roll="roll.Form" />
    <o-input :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" @roll="roll.First" reroll />
    <o-input :label="$t('oracles.fields.encounteredBehaviour')" v-model="data.behaviour" @roll="roll.Behave" />
    <o-input :label="$t('oracles.fields.revealedAspect')" v-model="data.aspect" @roll="roll.Aspect" reroll />

    <o-btns save @save="btns.Save" clear @clear="btns.Clear" initial @initial="btns.Initial" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { EEnv, ICreature } from '../models';

import { useCampaign } from 'src/store/campaign';

import { NewCreature } from 'src/lib/sector';
import * as oracle from 'src/lib/oracles';
import { enumOptions } from 'src/i18n';

import OBtns from './OBtns.vue';
import OInput from './OInput.vue';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'OCreature',
  setup() {
    const data = ref(NewCreature());
    const envOpts = computed(() => enumOptions(Object.values(EEnv), 'enums.env'));

    const roll = {
      Env: () => {
        data.value.environment = oracle.rollEn('Starforged/Oracles/Creatures/Environment') as EEnv;
      },
      Scale: () => {
        const res = oracle.rollDetailed('Starforged/Oracles/Creatures/Scale');
        if (
          res.linkTarget === 'Starforged/Oracles/Creatures/Ultra-scale' ||
          res.canonical.replace(/[^\p{L}-]/gu, '') === 'Ultra-scale'
        ) {
          data.value.scale = oracle.roll('Starforged/Oracles/Creatures/Ultra-scale');
        } else {
          data.value.scale = res.result.replace(/[^\p{L}\p{N} \(\)-]/gu, '').trim();
        }
      },
      Form: () => {
        data.value.form = oracle.roll(`Starforged/Oracles/Creatures/Basic_Form/${data.value.environment}`);
      },
      First: () => {
        const f = oracle.roll('Starforged/Oracles/Creatures/First_Look');
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Behave: () => {
        data.value.behaviour = oracle.roll('Starforged/Oracles/Creatures/Encountered_Behavior');
      },
      Aspect: () => {
        const a = oracle.roll('Starforged/Oracles/Creatures/Revealed_Aspect');
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
      envOpts,

      roll,
      btns,
    };
  },
});
</script>
