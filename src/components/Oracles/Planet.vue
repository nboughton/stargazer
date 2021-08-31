<template>
  <div class="row items-center">
    <q-select
      class="col-grow"
      label="Region"
      v-model="data.region"
      dense
      :options="Object.values(ERegion)"
    />
    <q-select
      class="col-grow"
      label="Type"
      v-model="data.type"
      dense
      :options="Object.values(EPClass)"
    />
    <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
  </div>

  <o-input label="Name" v-model="data.name" @roll="roll.Name" />

  <!--q-input label="Sector" v-model="data.sector" dense debounce="750" /-->

  <q-input
    label="Description"
    v-model="data.description"
    autogrow
    dense
    debounce="750"
  />

  <o-input label="Atmosphere" v-model="data.atmosphere" @roll="roll.Atmos" />

  <o-input label="Settlements" v-model="data.settlements" @roll="roll.Sett" />

  <o-input
    label="Observed From Space"
    v-model="data.observed"
    @roll="roll.Obs"
  />

  <o-input
    label="Planetside Feature"
    v-model="data.feature"
    @roll="roll.Feat"
  />

  <o-input label="Life" v-model="data.life" @roll="roll.Life" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { IPlanet, ERegion, EPClass } from 'src/components/models';
import { tableRoll } from 'src/lib/roll';
import { Planets, RollPlanetType } from 'src/lib/oracles/planets';
import OInput from './OInput.vue';
export default defineComponent({
  components: { OInput },
  name: 'Planet',
  props: {
    modelValue: {
      type: Object as PropType<IPlanet>,
    },
  },
  setup(props) {
    const data = ref(
      props.modelValue ||
        <IPlanet>{
          region: ERegion.Terminus,
          type: EPClass.Desert,
        }
    );

    watch(
      () => data.value.type,
      () => (data.value.description = Planets[data.value.type].description)
    );
    const roll = {
      Type: () => {
        data.value.type = RollPlanetType();
      },
      Name: () => {
        data.value.name =
          Planets[data.value.type].names[
            Math.floor(Math.random() * Planets[data.value.type].names.length)
          ];
      },
      Atmos: () => {
        data.value.atmosphere = tableRoll(Planets[data.value.type].atmosphere);
      },
      Sett: () => {
        data.value.settlements = tableRoll(
          Planets[data.value.type].settlements[data.value.region]
        );
      },
      Obs: () => {
        data.value.observed = tableRoll(Planets[data.value.type].observed);
      },
      Feat: () => {
        data.value.feature = tableRoll(Planets[data.value.type].feature);
      },
      Life: () => {
        data.value.life = tableRoll(Planets[data.value.type].life);
      },
    };

    return {
      data,
      ERegion,
      EPClass,
      roll,
    };
  },
});
</script>
