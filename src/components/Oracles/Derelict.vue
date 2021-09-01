<template>
  <!--q-input label="Name" v-model="data.name" dense debounce="750" /-->

  <div class="row items-center">
    <q-select
      class="col-grow"
      label="Location"
      v-model="data.location"
      :options="Object.values(ESLocation)"
      dense
    />
    <q-btn icon="mdi-dice-6" flat dense @click="roll.Loc" />
    <q-select
      class="col-grow"
      label="Type"
      v-model="data.type"
      :options="Object.values(EDerelictType)"
      dense
    />
    <q-btn icon="mdi-dice-6" flat dense @click="roll.Type" />
  </div>

  <o-input label="Condition" v-model="data.condition" @roll="roll.Cond" />

  <o-input
    label="Outer First Look"
    v-model="data.outerFirstLook"
    @roll="roll.OuterFirst"
  />

  <o-input
    label="Inner First Look"
    v-model="data.innerFirstLook"
    @roll="roll.InnerFirst"
  />

  <q-expansion-item label="Explore">
    <o-input
      label="Current Zone"
      v-model="data.currentZone"
      @roll="roll.Zone"
    />

    <o-input
      label="Area"
      v-model="data.explore.area"
      @roll="roll.Explore.Area"
    />

    <o-input
      label="Feature"
      v-model="data.explore.feature"
      @roll="roll.Explore.Feat"
    />

    <o-input
      label="Peril"
      v-model="data.explore.peril"
      @roll="roll.Explore.Peril"
    />

    <o-input
      label="Opportunity"
      v-model="data.explore.opportunity"
      @roll="roll.Explore.Opp"
    />
  </q-expansion-item>

  <o-btns
    clear
    @clear="btns.Clear"
    initial
    @initial="btns.Initial"
    save
    @save="btns.Save"
  />
</template>

<script lang="ts">
import { Derelict } from 'src/lib/oracles/derelict';
import { tableRoll } from 'src/lib/roll';
import { defineComponent, PropType, ref } from 'vue';
import { IDerelict, ESLocation, EDerelictType, EDerelictZone } from '../models';
import OBtns from './OBtns.vue';
import OInput from './OInput.vue';
export default defineComponent({
  components: { OInput, OBtns },
  name: 'Derelict',
  props: {
    modelValue: {
      type: Object as PropType<IDerelict>,
    },
  },
  setup(props) {
    const data = ref(
      props.modelValue ||
        <IDerelict>{
          location: ESLocation.Space,
          type: EDerelictType.Starship,
          currentZone: EDerelictZone.Access,
          explore: {
            area: '',
            feature: '',
            peril: '',
            opportunity: '',
          },
        }
    );

    const roll = {
      Loc: () => {
        data.value.location = tableRoll(Derelict.location) as ESLocation;
      },
      Type: () => {
        data.value.type = tableRoll(
          Derelict.type[data.value.location]
        ) as EDerelictType;
      },
      Cond: () => {
        data.value.condition = tableRoll(Derelict.condition);
      },
      OuterFirst: () => {
        data.value.outerFirstLook = tableRoll(Derelict.outerFirstLook);
      },
      InnerFirst: () => {
        data.value.innerFirstLook = tableRoll(Derelict.innerFirstLook);
      },
      Zone: () => {
        data.value.currentZone = tableRoll(
          Derelict.zone[data.value.type]
        ) as EDerelictZone;
      },
      Explore: {
        Area: () => {
          data.value.explore.area = tableRoll(
            Derelict.explore[data.value.currentZone].area
          );
        },
        Feat: () => {
          data.value.explore.feature = tableRoll(
            Derelict.explore[data.value.currentZone].feature
          );
        },
        Peril: () => {
          data.value.explore.peril = tableRoll(
            Derelict.explore[data.value.currentZone].peril
          );
        },
        Opp: () => {
          data.value.explore.opportunity = tableRoll(
            Derelict.explore[data.value.currentZone].opportunity
          );
        },
      },
    };

    const btns = {
      Clear: () => {
        data.value = <IDerelict>{
          location: ESLocation.Space,
          type: EDerelictType.Starship,
          currentZone: EDerelictZone.Access,
          explore: {
            area: '',
            feature: '',
            peril: '',
            opportunity: '',
          },
        };
      },
      Initial: () => {
        btns.Clear();
        roll.Loc();
        roll.Type();
        roll.Cond();
        roll.OuterFirst();
      },
      Save: () => {
        alert('Not yet implemented');
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
