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
    </div>

    <o-input :label="$t('common.name')" v-model="data.name" @roll="roll.Name" />

    <o-input :label="$t('oracles.fields.class')" v-model="data.class" @roll="roll.Class" />

    <o-input :label="$t('oracles.fields.fleet')" v-model="data.fleet" @roll="roll.Fleet" />

    <o-input :label="$t('oracles.fields.initialContact')" v-model="data.initialContact" @roll="roll.Cont" />

    <o-input :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" @roll="roll.First" reroll />

    <o-input :label="$t('oracles.fields.mission')" v-model="data.mission" @roll="roll.Mission" />

    <o-btns save @save="btns.Save" initial @initial="btns.Initial" clear @clear="btns.Clear" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { ERegion, IStarship } from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import * as oracle from 'src/lib/oracles';
import { NewShip } from 'src/lib/sector';
import { enumOptions } from 'src/i18n';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  components: { OInput, OBtns },
  name: 'OStarship',
  setup() {
    const data = ref(NewShip());
    const regionSelect = ref(ERegion.Terminus);
    const regionOpts = computed(() => enumOptions(Object.values(ERegion), 'enums.region'));

    const rollFleetValue = (): string => {
      const fleetRes = oracle.rollDetailed('Starforged/Oracles/Starships/Fleet');
      if (
        fleetRes.linkTarget === 'Starforged/Oracles/Starships/Mission' ||
        /Starship Mission/i.test(fleetRes.canonical)
      ) {
        const missionName = oracle.name('Starforged/Oracles/Starships/Mission');
        return `${missionName}: ${oracle.roll(`Starforged/Oracles/Starships/Mission/${regionSelect.value}`)}`;
      }
      return fleetRes.result;
    };

    const roll = {
      Name: () => {
        data.value.name = oracle.roll('Starforged/Oracles/Starships/Name');
      },
      Class: () => {
        const typeRes = oracle.rollDetailed('Starforged/Oracles/Starships/Type');
        if (typeRes.linkTarget === 'Starforged/Oracles/Starships/Fleet' || /Fleet/i.test(typeRes.canonical)) {
          const fleetName = oracle.name('Starforged/Oracles/Starships/Fleet');
          data.value.class = `${fleetName}: ${rollFleetValue()}`;
        } else {
          data.value.class = typeRes.result;
        }
      },
      Fleet: () => {
        data.value.fleet = rollFleetValue();
      },
      Cont: () => {
        data.value.initialContact = oracle.roll('Starforged/Oracles/Starships/Initial_Contact');
      },
      First: () => {
        const f = oracle.roll('Starforged/Oracles/Starships/First_Look');
        data.value.firstLook ? (data.value.firstLook += ', ' + f) : (data.value.firstLook = f);
      },
      Mission: () => {
        data.value.mission = oracle.roll(`Starforged/Oracles/Starships/Mission/${regionSelect.value}`);
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
      regionOpts,
      ERegion,

      roll,
      btns,
    };
  },
});
</script>
