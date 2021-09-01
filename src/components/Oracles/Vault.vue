<template>
  <div>
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
    </div>

    <o-input label="Scale" v-model="data.scale" @roll="roll.Scale" />
    <o-input label="Form" v-model="data.form" @roll="roll.Form" />
    <o-input label="Shape" v-model="data.shape" @roll="roll.Shape" />
    <o-input label="Material" v-model="data.material" @roll="roll.Material" />
    <o-input
      label="Outer First Look"
      v-model="data.outerFirstLook"
      @roll="roll.OuterFirst"
      reroll
    />
    <o-input
      label="Inner First Look"
      v-model="data.innerFirstLook"
      @roll="roll.InnerFirst"
      reroll
    />

    <q-expansion-item label="Interior">
      <o-input
        label="Feature"
        v-model="data.interior.feature"
        @roll="roll.Int.Feat"
      />
      <o-input
        label="Peril"
        v-model="data.interior.peril"
        @roll="roll.Int.Peril"
      />
      <o-input
        label="Opportunity"
        v-model="data.interior.opportunity"
        @roll="roll.Int.Opp"
      />
    </q-expansion-item>

    <q-expansion-item label="Sanctum">
      <o-input
        label="Feature"
        v-model="data.sanctum.feature"
        @roll="roll.Sanct.Feat"
      />
      <o-input
        label="Peril"
        v-model="data.sanctum.peril"
        @roll="roll.Sanct.Peril"
      />
      <o-input
        label="Opportunity"
        v-model="data.sanctum.opportunity"
        @roll="roll.Sanct.Opp"
      />
      <o-input label="Purpose" v-model="data.purpose" @roll="roll.Purpose" />
    </q-expansion-item>
  </div>
  <o-btns
    clear
    @clear="btns.Clear"
    save
    @save="btns.Save"
    initial
    @initial="btns.Initial"
  />
</template>

<script lang="ts">
import { Vault } from 'src/lib/oracles/vault';
import { tableRoll } from 'src/lib/roll';
import { defineComponent, PropType, ref } from 'vue';
import { IVault, ESLocation } from '../models';

import OInput from 'src/components/Oracles/OInput.vue';
import OBtns from './OBtns.vue';

export default defineComponent({
  name: 'Vault',
  components: { OInput, OBtns },
  props: {
    modelValue: {
      type: Object as PropType<IVault>,
    },
  },
  setup(props) {
    const data = ref(
      props.modelValue ||
        <IVault>{
          location: ESLocation.Planetside,
          interior: {
            feature: '',
            peril: '',
            opportunity: '',
          },
          sanctum: {
            feature: '',
            peril: '',
            opportunity: '',
          },
        }
    );

    const roll = {
      Loc: () => {
        data.value.location = tableRoll(Vault.location) as ESLocation;
      },
      Scale: () => {
        data.value.scale = tableRoll(Vault.scale);
      },
      Form: () => {
        data.value.form = tableRoll(Vault.form);
      },
      Shape: () => {
        data.value.shape = tableRoll(Vault.shape);
      },
      Material: () => {
        data.value.material = tableRoll(Vault.material);
      },
      OuterFirst: () => {
        const o = tableRoll(Vault.outerFirstLook);
        data.value.outerFirstLook
          ? (data.value.outerFirstLook += ', ' + o)
          : (data.value.outerFirstLook = o);
      },
      InnerFirst: () => {
        const i = tableRoll(Vault.innerFirstLook);
        data.value.innerFirstLook
          ? (data.value.innerFirstLook += ', ' + i)
          : (data.value.innerFirstLook = i);
      },
      Purpose: () => {
        data.value.purpose = tableRoll(Vault.purpose);
      },
      Int: {
        Feat: () => {
          data.value.interior.feature = tableRoll(Vault.interior.feature);
        },
        Peril: () => {
          data.value.interior.peril = tableRoll(Vault.interior.peril);
        },
        Opp: () => {
          data.value.interior.opportunity = tableRoll(
            Vault.interior.opportunity
          );
        },
      },
      Sanct: {
        Feat: () => {
          data.value.sanctum.feature = tableRoll(Vault.sanctum.feature);
        },
        Peril: () => {
          data.value.sanctum.peril = tableRoll(Vault.sanctum.peril);
        },
        Opp: () => {
          data.value.sanctum.opportunity = tableRoll(Vault.sanctum.opportunity);
        },
      },
    };

    const btns = {
      Clear: () => {
        data.value = <IVault>{
          location: ESLocation.Planetside,
          interior: {
            feature: '',
            peril: '',
            opportunity: '',
          },
          sanctum: {
            feature: '',
            peril: '',
            opportunity: '',
          },
        };
      },
      Initial: () => {
        btns.Clear();
        roll.Loc();
        roll.Scale();
        roll.Form();
        roll.Shape();
        roll.Material();
        roll.OuterFirst();
      },
      Save: () => {
        alert('Not yet implemented');
      },
    };

    return {
      data,
      ESLocation,

      roll,
      btns,
    };
  },
});
</script>
