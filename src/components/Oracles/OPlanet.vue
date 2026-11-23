<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select
        class="col-grow"
        :label="$t('common.region')"
        v-model="regionSelect"
        dense
        map-options
        emit-value
        :options="regionOpts"
      />
      <q-select
        class="col-grow"
        :label="$t('common.type')"
        v-model="data.type"
        dense
        map-options
        emit-value
        :options="planetClassOpts"
      />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
    </div>

    <o-input :label="$t('common.name')" v-model="data.name" @roll="roll.Name" />

    <div class="row items-center">
      <clipboard-btn :data="data.description" />
      <q-input class="col-grow" :label="$t('common.description')" v-model="data.description" autogrow dense />
      <q-btn icon="mdi-playlist-plus" flat dense @click="btns.DescText">
        <q-tooltip>{{ $t('oracles.fields.useDefaultDescTip') }}</q-tooltip>
      </q-btn>
    </div>

    <o-input :label="$t('oracles.fields.atmosphere')" v-model="data.atmosphere" @roll="roll.Atmos" />

    <o-input :label="$t('oracles.fields.settlements')" v-model="data.settlements" @roll="roll.Sett" />

    <o-input :label="$t('oracles.fields.observedFromSpace')" v-model="data.observed" @roll="roll.Obs" reroll />

    <o-input :label="$t('oracles.fields.planetsideFeature')" v-model="data.feature" @roll="roll.Feat" reroll />

    <o-input :label="$t('oracles.fields.life')" v-model="data.life" @roll="roll.Life" />

    <o-input v-if="data.type == EPClass.Vital" :label="$t('oracles.fields.diversity')" v-model="data.diversity" @roll="roll.Diversity" />

    <o-input v-if="data.type == EPClass.Vital" :label="$t('oracles.fields.biomes')" v-model="data.biomes" @roll="roll.Biomes" />

    <o-input :label="$t('oracles.fields.planetsidePeril')" v-model="poppers.peril" @roll="roll.Peril" />

    <o-input :label="$t('oracles.fields.planetsideOpportunity')" v-model="poppers.opportunity" @roll="roll.Opp" />

    <o-btns save @save="btns.Save" clear @clear="btns.Clear" initial @initial="btns.Initial" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { IPlanet, ERegion, EPClass } from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import * as oracle from 'src/lib/oracles';
import { NewPlanet } from 'src/lib/sector';
import { enumOptions } from 'src/i18n';

import OInput from './OInput.vue';
import OBtns from './OBtns.vue';
import ClipboardBtn from '../Widgets/ClipboardBtn.vue';

export default defineComponent({
  components: { OInput, OBtns, ClipboardBtn },
  name: 'OPlanet',
  setup() {
    const data = ref(NewPlanet());

    const regionSelect = ref(ERegion.Terminus);
    const regionOpts = computed(() => enumOptions(Object.values(ERegion), 'enums.region'));
    const planetClassOpts = computed(() => enumOptions(Object.values(EPClass), 'enums.planetClass'));

    const poppers = ref({
      peril: '',
      opportunity: '',
    });

    const isLifeless = (): boolean => {
      const idx = oracle.rowIndexForValue(`Starforged/Oracles/Planets/${data.value.type}/Life`, data.value.life);
      if (idx === 0 || idx === 1) return true;
      return /(none|extinct|nenhum|nenhuma|extint)/i.test(data.value.life);
    };

    const roll = {
      Type: () => {
        const tail = oracle.rollLinkTail('Starforged/Oracles/Planets/Class') as EPClass;
        data.value.type = Object.values(EPClass).includes(tail) ? tail : EPClass.Desert;
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
        if (data.value.type == EPClass.Vital && data.value.diversity && data.value.diversity.length > 0) {
          const idx = oracle.rowIndexForValue(
            `Starforged/Oracles/Planets/${EPClass.Vital}/Diversity`,
            data.value.diversity
          );
          const counts = [2, 3, 4, 5];
          const count = idx >= 0 && idx < counts.length ? counts[idx] : 0;
          if (count > 0) {
            data.value.biomes = Array.from({ length: count }, () =>
              oracle.roll(`Starforged/Oracles/Planets/${EPClass.Vital}/Biomes`)
            ).join(', ');
          }
        }
      },
      Peril: () => {
        poppers.value.peril = isLifeless()
          ? oracle.roll('Starforged/Oracles/Planets/Peril/Lifeless')
          : oracle.roll('Starforged/Oracles/Planets/Peril/Lifebearing');
      },
      Opp: () => {
        poppers.value.opportunity = isLifeless()
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
      regionOpts,
      planetClassOpts,
      poppers,
      ERegion,
      EPClass,
      roll,
      btns,
    };
  },
});
</script>
