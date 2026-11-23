<template>
  <div class="card-bg q-pa-xs">
    <o-input :label="$t('common.name')" v-model="data.name" @roll="roll.Name" />
    <o-input :label="$t('character.pronouns')" v-model="data.pronouns" no-roll />
    <o-input :label="$t('character.callsign')" v-model="data.callsign" @roll="roll.Call" />
    <o-input :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" @roll="roll.First" reroll />
    <o-input :label="$t('oracles.fields.disposition')" v-model="data.disposition" @roll="roll.Disp" />
    <o-input :label="$t('oracles.fields.role')" v-model="data.role" @roll="roll.Role" />
    <o-input :label="$t('oracles.fields.goal')" v-model="data.goal" @roll="roll.Goal" />
    <o-input :label="$t('oracles.fields.revealedAspect')" v-model="data.aspect" @roll="roll.Aspect" reroll :maxRerolls="3" />
    <o-btns save @save="btns.Save" clear @clear="btns.Clear" initial @initial="btns.Initial" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { INPC } from '../models';

import { useCampaign } from 'src/store/campaign';

import * as oracle from 'src/lib/oracles';
import { NewNPC } from 'src/lib/sector';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  name: 'OCharacter',
  components: { OInput, OBtns },
  setup() {
    const data = ref(NewNPC());

    const roll = {
      Name: () => {
        data.value.name = `${oracle.roll('Starforged/Oracles/Characters/Name/Given_Name')} ${oracle.roll(
          'Starforged/Oracles/Characters/Name/Family_Name'
        )}`;
      },
      Call: () => {
        data.value.callsign = oracle.roll('Starforged/Oracles/Characters/Name/Callsign');
      },
      First: () => {
        const f = oracle.roll('Starforged/Oracles/Characters/First_Look');
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Disp: () => {
        data.value.disposition = oracle.roll('Starforged/Oracles/Characters/Disposition');
      },
      Role: () => {
        data.value.role = oracle.roll('Starforged/Oracles/Characters/Role');
      },
      Goal: () => {
        data.value.goal = oracle.roll('Starforged/Oracles/Characters/Goal');
      },
      Aspect: () => {
        const a = oracle.roll('Starforged/Oracles/Characters/Revealed_Aspect');
        data.value.aspect ? (data.value.aspect += ', ' + a) : (data.value.aspect = a);
      },
    };

    const btns = {
      Clear: () => {
        data.value = NewNPC();
      },
      Initial: () => {
        btns.Clear();
        roll.Name();
        roll.Call();
        roll.First();
        roll.Disp();
      },
      Save: (args: { sector: number; cell: number }) => {
        const storeCopy = JSON.parse(JSON.stringify(data.value)) as INPC;
        useCampaign().data.sectors[args.sector].cells[args.cell].npcs.unshift(storeCopy);
      },
    };
    return {
      data,
      roll,
      btns,
    };
  },
});
</script>
