<template>
  <!-- file deepcode ignore PureFunctionReturnValueIgnored: value passed to component -->
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select class="col-grow" label="Location" v-model="data.location" :options="Object.values(ESLocation)" dense />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Loc" />
      <q-select class="col-grow" label="Type" v-model="data.type" :options="Object.values(EDerelictType)" dense />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
    </div>

    <o-input label="Name" v-model="data.name" @roll="roll.Name" />

    <o-input label="Condition" v-model="data.condition" @roll="roll.Cond" />

    <o-input label="Outer First Look" v-model="data.outerFirstLook" @roll="roll.OuterFirst" />

    <o-input label="Inner First Look" v-model="data.innerFirstLook" @roll="roll.InnerFirst" />

    <q-expansion-item label="Explore">
      <o-input label="Current Zone" v-model="data.currentZone" @roll="roll.Zone" />

      <o-input label="Area" v-model="data.explore.area" @roll="roll.Explore.Area" />

      <o-input label="Feature" v-model="data.explore.feature" @roll="roll.Explore.Feat" />

      <o-input label="Peril" v-model="data.explore.peril" @roll="roll.Explore.Peril" />

      <o-input label="Opportunity" v-model="data.explore.opportunity" @roll="roll.Explore.Opp" />
    </q-expansion-item>

    <o-btns clear @clear="btns.Clear" initial @initial="btns.Initial" save @save="btns.Save" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref } from 'vue';

import { ESLocation, EDerelictType, EDerelictZone } from '../models';

import { useCampaign } from 'src/store/campaign';

import { NewDerelict } from 'src/lib/sector';
import * as oracle from 'src/lib/oracles';

import OBtns from './OBtns.vue';
import OInput from './OInput.vue';
import { deepCopy } from 'src/lib/util';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'ODerelict',
  setup() {
    const data = ref(NewDerelict());

    const roll = {
      Loc: () => {
        data.value.location = oracle.roll('Starforged/Oracles/Derelicts/Location') as ESLocation;
      },
      Type: () => {
        data.value.type = oracle.roll(
          `Starforged/Oracles/Derelicts/Type/${data.value.location.replace(/ /gi, '_')}`
        ) as EDerelictType;
      },
      Name: () => {
        data.value.name =
          data.value.type === EDerelictType.Starship
            ? oracle.roll('Starforged/Oracles/Starships/Name')
            : oracle.roll('Starforged/Oracles/Settlements/Name');
      },
      Cond: () => {
        data.value.condition = oracle.roll('Starforged/Oracles/Derelicts/Condition');
      },
      OuterFirst: () => {
        data.value.outerFirstLook = oracle.roll('Starforged/Oracles/Derelicts/Outer_First_Look');
      },
      InnerFirst: () => {
        data.value.innerFirstLook = oracle.roll('Starforged/Oracles/Derelicts/Inner_First_Look');
      },
      Zone: () => {
        data.value.currentZone = oracle
          .roll(`Starforged/Oracles/Derelicts/Zones/${data.value.type}`)
          .replace(/[^a-z]/gi, '') as EDerelictZone;
      },
      Explore: {
        Area: () => {
          data.value.explore.area = oracle.roll(`Starforged/Oracles/Derelicts/${data.value.currentZone}/Area`);
        },
        Feat: () => {
          data.value.explore.feature = oracle.roll(`Starforged/Oracles/Derelicts/${data.value.currentZone}/Feature`);
        },
        Peril: () => {
          data.value.explore.peril = oracle.roll(`Starforged/Oracles/Derelicts/${data.value.currentZone}/Peril`);
        },
        Opp: () => {
          data.value.explore.opportunity = oracle.roll(
            `Starforged/Oracles/Derelicts/${data.value.currentZone}/Opportunity`
          );
        },
      },
    };

    const btns = {
      Clear: () => {
        const loc = data.value.location;
        const type = data.value.type;
        data.value = NewDerelict(loc, type);
      },
      Initial: () => {
        btns.Clear();
        roll.Name();
        roll.Cond();
        roll.OuterFirst();
      },
      Save: (args: { sector: number; cell: number }) => {
        const app = useCampaign();
        app.ca.sectors[args.sector].cells[args.cell].derelicts.unshift(deepCopy(data.value));
      },
    };
    return {
      data,
      ESLocation,
      EDerelictType,
      EDerelictZone,

      roll,
      btns,
    };
  },
});
</script>
