<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select
        class="col-grow"
        :label="$t('common.location')"
        v-model="data.location"
        :options="locOpts"
        map-options
        emit-value
        dense
      />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Loc" />
      <q-select
        class="col-grow"
        :label="$t('common.type')"
        v-model="data.type"
        :options="typeOpts"
        map-options
        emit-value
        dense
      />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
    </div>

    <o-input :label="$t('common.name')" v-model="data.name" @roll="roll.Name" />

    <o-input :label="$t('oracles.fields.condition')" v-model="data.condition" @roll="roll.Cond" />

    <o-input :label="$t('oracles.fields.outerFirstLook')" v-model="data.outerFirstLook" @roll="roll.OuterFirst" />

    <o-input :label="$t('oracles.fields.innerFirstLook')" v-model="data.innerFirstLook" @roll="roll.InnerFirst" />

    <q-expansion-item :label="$t('oracles.fields.explore')">
      <div class="row items-center">
        <clipboard-btn :data="data.currentZone ? $t(`enums.derelictZone.${data.currentZone}`) : ''" />
        <q-select
          class="col-grow"
          :label="$t('oracles.fields.currentZone')"
          v-model="data.currentZone"
          :options="zoneOpts"
          map-options
          emit-value
          dense
        />
        <q-btn icon="mdi-dice-6" flat dense @click="roll.Zone" />
      </div>

      <o-input :label="$t('oracles.fields.area')" v-model="data.explore.area" @roll="roll.Explore.Area" />

      <o-input :label="$t('oracles.fields.feature')" v-model="data.explore.feature" @roll="roll.Explore.Feat" />

      <o-input :label="$t('oracles.fields.peril')" v-model="data.explore.peril" @roll="roll.Explore.Peril" />

      <o-input :label="$t('oracles.fields.opportunity')" v-model="data.explore.opportunity" @roll="roll.Explore.Opp" />
    </q-expansion-item>

    <o-btns clear @clear="btns.Clear" initial @initial="btns.Initial" save @save="btns.Save" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed, defineComponent, ref } from 'vue';

import { ESLocation, EDerelictType, EDerelictZone, IDerelict } from '../models';

import { useCampaign } from 'src/store/campaign';

import { NewDerelict } from 'src/lib/sector';
import * as oracle from 'src/lib/oracles';
import { enumOptions } from 'src/i18n';

import OBtns from './OBtns.vue';
import OInput from './OInput.vue';
import ClipboardBtn from '../Widgets/ClipboardBtn.vue';

export default defineComponent({
  components: { OInput, OBtns, ClipboardBtn },
  name: 'ODerelict',
  setup() {
    const data = ref(NewDerelict());
    const locOpts = computed(() => enumOptions(Object.values(ESLocation), 'enums.location'));
    const typeOpts = computed(() => enumOptions(Object.values(EDerelictType), 'enums.derelictType'));
    const zoneOpts = computed(() => enumOptions(Object.values(EDerelictZone), 'enums.derelictZone'));

    const roll = {
      Loc: () => {
        data.value.location = oracle.rollEn('Starforged/Oracles/Derelicts/Location') as ESLocation;
      },
      Type: () => {
        data.value.type = oracle.rollEn(
          `Starforged/Oracles/Derelicts/Type/${data.value.location.replace(' ', '_')}`
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
        data.value.currentZone = oracle.rollLinkTail(
          `Starforged/Oracles/Derelicts/Zones/${data.value.type}`
        ) as EDerelictZone;
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
        const storeCopy = JSON.parse(JSON.stringify(data.value)) as IDerelict;
        useCampaign().data.sectors[args.sector].cells[args.cell].derelicts.unshift(storeCopy);
      },
    };
    return {
      data,
      locOpts,
      typeOpts,
      zoneOpts,
      ESLocation,
      EDerelictType,
      EDerelictZone,

      roll,
      btns,
    };
  },
});
</script>
