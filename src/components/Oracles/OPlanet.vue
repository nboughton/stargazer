<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select class="col-grow" label="Region" v-model="regionSelect" dense :options="Object.values(ERegion)" />
      <q-select class="col-grow" label="Type" v-model="data.type" dense :options="Object.values(EPClass)" />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
    </div>

    <o-input label="Name" v-model="data.name" @roll="roll.Name" />

    <div class="row items-center">
      <clipboard-btn :data="data.description" />
      <q-input class="col-grow" label="Description" v-model="data.description" autogrow dense />
      <q-btn icon="mdi-playlist-plus" flat dense @click="btns.DescText">
        <q-tooltip>Use default description text</q-tooltip>
      </q-btn>
    </div>

    <o-input label="Atmosphere" v-model="data.atmosphere" @roll="roll.Atmos" />

    <o-input label="Settlements" v-model="data.settlements" @roll="roll.Sett" />

    <o-input label="Observed From Space" v-model="data.observed" @roll="roll.Obs" reroll />

    <o-input label="Planetside Feature" v-model="data.feature" @roll="roll.Feat" reroll />

    <o-input label="Life" v-model="data.life" @roll="roll.Life" />

    <o-input v-if="data.type == EPClass.Vital" label="Diversity" v-model="data.diversity" @roll="roll.Diversity" />

    <o-input v-if="data.type == EPClass.Vital" label="Biomes" v-model="data.biomes" @roll="roll.Biomes" />

    <o-input label="Planetside Peril" v-model="poppers.peril" @roll="roll.Peril" />

    <o-input label="Planetside Opportunity" v-model="poppers.opportunity" @roll="roll.Opp" />

    <o-btns save @save="btns.Save" clear @clear="btns.Clear" initial @initial="btns.Initial" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { IPlanet, ERegion, EPClass } from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import * as oracle from 'src/lib/oracles';
import { NewPlanet } from 'src/lib/sector';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';
import ClipboardBtn from '../ClipboardBtn.vue';

export default defineComponent({
  components: { OInput, OBtns, ClipboardBtn },
  name: 'OPlanet',
  setup() {
    const data = ref(NewPlanet());

    const regionSelect = ref(ERegion.Terminus);

    const poppers = ref({
      peril: '',
      opportunity: '',
    });

    const roll = {
      Type: () => {
        data.value.type = oracle
          .roll('Starforged/Oracles/Planets/Class')
          .replace(/[^a-z]/gi, '')
          .replace('World', '') as EPClass;
        data.value.description = oracle.description(`Starforged/Oracles/Planets/${data.value.type}`);
      },
      Name: () => {
        data.value.name = oracle.roll(`Starforged/Oracles/Planets/${data.value.type}/Sample Names`);
      },
      Atmos: () => {
        data.value.atmosphere = oracle.roll(`Starforged/Oracles/Planets/${data.value.type}/Atmosphere`);
      },
      Sett: () => {
        data.value.settlements = oracle.roll(
          `Starforged/Oracles/Planets/${data.value.type}/Settlements/${regionSelect.value}`
        );
      },
      Obs: () => {
        const o = oracle.roll(`Starforged/Oracles/Planets/${data.value.type}/Observed_From_Space`);
        data.value.observed ? (data.value.observed += `, ${o}`) : (data.value.observed = o);
      },
      Feat: () => {
        const f = oracle.roll(`Starforged/Oracles/Planets/${data.value.type}/Feature`);
        data.value.feature ? (data.value.feature += `, ${f}`) : (data.value.feature = f);
      },
      Life: () => {
        data.value.life = oracle.roll(`Starforged/Oracles/Planets/${data.value.type}/Life`);
      },
      Diversity: () => {
        if (data.value.type == EPClass.Vital)
          data.value.diversity = oracle.roll(`Starforged/Oracles/Planets/${data.value.type}/Diversity`);
      },
      Biomes: () => {
        const b = oracle.roll(`Starforged/Oracles/Planets/${EPClass.Vital}/Biomes`);
        data.value.biomes ? (data.value.biomes += `, ${b}`) : (data.value.biomes = b);
      },
      BiomesAuto: () => {
        if (data.value.type == EPClass.Vital)
          if (data.value.diversity && data.value.diversity.length > 0)
            switch (data.value.diversity) {
              case 'Simple (two biomes)':
                data.value.biomes = [1, 2]
                  .map(() => oracle.roll(`Starforged/Oracles/Planets/${EPClass.Vital}/Biomes`))
                  .join(', ');
                break;
              case 'Diverse (three biomes)':
                data.value.biomes = [1, 2, 3]
                  .map(() => oracle.roll(`Starforged/Oracles/Planets/${EPClass.Vital}/Biomes`))
                  .join(', ');
                break;
              case 'Complex (four biomes)':
                data.value.biomes = [1, 2, 3, 4]
                  .map(() => oracle.roll(`Starforged/Oracles/Planets/${EPClass.Vital}/Biomes`))
                  .join(', ');
                break;
              case 'Garden world (five or more biomes)':
                data.value.biomes = [1, 2, 3, 4, 5]
                  .map(() => oracle.roll(`Starforged/Oracles/Planets/${EPClass.Vital}/Biomes`))
                  .join(', ');
                break;
            }
      },
      Peril: () => {
        poppers.value.peril = /(none|extinct)/i.test(data.value.life)
          ? oracle.roll('Starforged/Oracles/Planets/Peril/Lifeless')
          : oracle.roll('Starforged/Oracles/Planets/Peril/Lifebearing');
      },
      Opp: () => {
        poppers.value.opportunity = /(none|extinct)/i.test(data.value.life)
          ? oracle.roll('Starforged/Oracles/Planets/Opportunity/Lifeless')
          : oracle.roll('Starforged/Oracles/Planets/Opportunity/Lifebearing');
      },
    };

    const btns = {
      Clear: () => {
        const t = data.value.type;
        data.value = NewPlanet(t);

        poppers.value = {
          peril: '',
          opportunity: '',
        };
      },
      Initial: () => {
        btns.Clear();
        roll.Type();
        roll.Name();
        roll.Atmos();
        roll.Sett();
        roll.Obs();
      },
      Save: (args: { sector: number; cell: number }) => {
        // prevent side effects from passing by reference
        const storeCopy = JSON.parse(JSON.stringify(data.value)) as IPlanet;
        useCampaign().data.sectors[args.sector].cells[args.cell].planets.unshift(storeCopy);
      },
      DescText: () => {
        // data.value.description = oracle.description(['Planets', data.value.type]);
      },
    };

    return {
      data,
      regionSelect,
      poppers,
      ERegion,
      EPClass,
      roll,
      btns,
    };
  },
});
</script>
