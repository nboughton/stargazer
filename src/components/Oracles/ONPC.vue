<template>
  <div class="card-bg q-pa-xs">
    <o-input label="Name" v-model="data.name" @roll="roll.Name" />
    <o-input label="Pronouns" v-model="data.pronouns" no-roll />
    <o-input label="Callsign" v-model="data.callsign" @roll="roll.Call" />
    <o-input label="First Look" v-model="data.firstLook" @roll="roll.First" reroll />
    <o-input label="Disposition" v-model="data.disposition" @roll="roll.Disp" />
    <o-input label="Role" v-model="data.role" @roll="roll.Role" />
    <o-input label="Goal" v-model="data.goal" @roll="roll.Goal" />
    <o-input label="Revealed Aspect" v-model="data.aspect" @roll="roll.Aspect" reroll :maxRerolls="3" />
    <o-btns save @save="btns.Save" clear @clear="btns.Clear" initial @initial="btns.Initial" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { INPC } from '../models';

import { useCampaign } from 'src/store/campaign';

import { tableRoll } from 'src/lib/roll';
import { Character } from 'src/lib/oracles/character';
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
        data.value.name = `${tableRoll(Character.givenName)} ${tableRoll(Character.familyName)}`;
      },
      Call: () => {
        data.value.callsign = tableRoll(Character.callsign);
      },
      First: () => {
        const f = tableRoll(Character.firstLook);
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Disp: () => {
        data.value.disposition = tableRoll(Character.disposition);
      },
      Role: () => {
        data.value.role = tableRoll(Character.role);
      },
      Goal: () => {
        data.value.goal = tableRoll(Character.goal);
      },
      Aspect: () => {
        const a = tableRoll(Character.aspect);
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
