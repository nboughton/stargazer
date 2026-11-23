<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select
        class="col-grow"
        :label="$t('common.region')"
        v-model="regionSelect"
        :options="regionOpts"
        map-options
        emit-value
        dense
      />
      <q-select
        class="col-grow"
        :label="$t('common.location')"
        v-model="data.location"
        :options="locOpts"
        map-options
        emit-value
        dense
      />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="roll.Loc" />
    </div>

    <o-input :label="$t('common.name')" v-model="data.name" @roll="roll.Name" />

    <div class="row items-center">
      <clipboard-btn :data="data.population ? $t(`enums.settPop.${data.population}`) : ''" />
      <q-select
        class="col-grow"
        :label="$t('oracles.fields.population')"
        v-model="data.population"
        :options="popOpts"
        map-options
        emit-value
        dense
      />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="roll.Pop" />
    </div>

    <o-input :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" @roll="roll.First" reroll />

    <o-input :label="$t('oracles.fields.initialContact')" v-model="data.initialContact" @roll="roll.Cont" />

    <o-input :label="$t('oracles.fields.authority')" v-model="data.authority" @roll="roll.Auth" />

    <o-input :label="$t('faction.projects')" v-model="data.projects" @roll="roll.Proj" reroll />

    <o-input :label="$t('oracles.fields.trouble')" v-model="data.trouble" @roll="roll.Trouble" />

    <o-btns clear @clear="btns.Clear" initial @initial="btns.Initial" save @save="btns.Save" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { ISettlement, ESLocation, ERegion, ESettPop } from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import * as oracle from 'src/lib/oracles';
import { NewSettlement } from 'src/lib/sector';
import { enumOptions } from 'src/i18n';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';
import ClipboardBtn from '../Widgets/ClipboardBtn.vue';

export default defineComponent({
  components: { OInput, OBtns, ClipboardBtn },
  name: 'OSettlement',
  setup() {
    const data = ref(NewSettlement());
    const regionSelect = ref(ERegion.Terminus);
    const regionOpts = computed(() => enumOptions(Object.values(ERegion), 'enums.region'));
    const locOpts = computed(() => enumOptions(Object.values(ESLocation), 'enums.location'));
    const popOpts = computed(() => enumOptions(Object.values(ESettPop), 'enums.settPop'));

    const roll = {
      Loc: () => {
        data.value.location = oracle.rollEn('Starforged/Oracles/Settlements/Location') as ESLocation;
      },
      Name: () => {
        data.value.name = oracle.roll('Starforged/Oracles/Settlements/Name');
      },
      Pop: () => {
        data.value.population = oracle.rollEn(`Starforged/Oracles/Settlements/Population/${regionSelect.value}`);
      },
      First: () => {
        const f = oracle.roll('Starforged/Oracles/Settlements/First_Look');
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Cont: () => {
        data.value.initialContact = oracle.roll('Starforged/Oracles/Settlements/Initial_Contact');
      },
      Auth: () => {
        data.value.authority = oracle.roll('Starforged/Oracles/Settlements/Authority');
      },
      Proj: () => {
        const p = oracle.roll('Starforged/Oracles/Settlements/Projects');
        data.value.projects ? (data.value.projects += ', ' + p) : (data.value.projects = p);
      },
      Trouble: () => {
        data.value.trouble = oracle.roll('Starforged/Oracles/Settlements/Trouble');
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
      regionOpts,
      locOpts,
      popOpts,
      ERegion,
      ESLocation,
      ESettPop,
      roll,
      btns,
    };
  },
});
</script>
