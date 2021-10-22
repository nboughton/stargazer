<template>
  <div class="card-bg q-pa-xs">
    <div class="row items-center">
      <q-select class="col-grow" label="Region" v-model="regionSelect" dense :options="Object.values(ERegion)" />
      <q-select class="col-grow" label="Type" v-model="data.type" dense :options="Object.values(EPClass)" />
      <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
    </div>

    <o-input label="Name" v-model="data.name" @roll="roll.Name" />

    <div class="row items-center">
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

    <o-input label="Planetside Peril" v-model="poppers.peril" @roll="roll.Peril" />

    <o-input label="Planetsiide Opportunity" v-model="poppers.opportunity" @roll="roll.Opp" />

    <o-btns save @save="btns.Save" clear @clear="btns.Clear" initial @initial="btns.Initial" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IPlanet, ERegion, EPClass } from 'src/components/models';
import { tableRoll } from 'src/lib/roll';
import { Opportunity, Peril, Planets, RollPlanetType } from 'src/lib/oracles/planets';
import OInput from './OInput.vue';
import OBtns from './OBtns.vue';
import { useCampaign } from 'src/store/campaign';
import { NewPlanet } from 'src/lib/sector';

export default defineComponent({
  components: { OInput, OBtns },
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
        data.value.type = RollPlanetType();
        data.value.description = Planets[data.value.type].description;
      },
      Name: () => {
        data.value.name =
          Planets[data.value.type].names[Math.floor(Math.random() * Planets[data.value.type].names.length)];
      },
      Atmos: () => {
        data.value.atmosphere = tableRoll(Planets[data.value.type].atmosphere);
      },
      Sett: () => {
        data.value.settlements = tableRoll(Planets[data.value.type].settlements[regionSelect.value]);
      },
      Obs: () => {
        const o = tableRoll(Planets[data.value.type].observed);
        data.value.observed ? (data.value.observed += ', ' + o) : (data.value.observed = o);
      },
      Feat: () => {
        const f = tableRoll(Planets[data.value.type].feature);
        data.value.feature ? (data.value.feature += ', ' + f) : (data.value.feature = f);
      },
      Life: () => {
        data.value.life = tableRoll(Planets[data.value.type].life);
      },
      Peril: () => {
        poppers.value.peril = /(none|extinct)/i.test(data.value.life)
          ? tableRoll(Peril.lifeless)
          : tableRoll(Peril.lifebearing);
      },
      Opp: () => {
        poppers.value.opportunity = /(none|extinct)/i.test(data.value.life)
          ? tableRoll(Opportunity.lifeless)
          : tableRoll(Opportunity.lifebearing);
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
        data.value.description = Planets[data.value.type].description;
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
