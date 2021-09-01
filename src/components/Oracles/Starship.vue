<template>
  <div class="row items-center">
    <q-select
      class="col-grow"
      label="Region"
      v-model="regionSelect"
      :options="Object.values(ERegion)"
      dense
    />
  </div>

  <o-input label="Name" v-model="data.name" @roll="roll.Name" />

  <o-input label="Class" v-model="data.class" @roll="roll.Class" />

  <o-input label="Fleet" v-model="data.fleet" @roll="roll.Fleet" />

  <o-input
    label="Initial Contact"
    v-model="data.initialContact"
    @roll="roll.Cont"
  />

  <o-input
    label="First Look"
    v-model="data.firstLook"
    @roll="roll.First"
    reroll
  />

  <o-input label="Mission" v-model="data.mission" @roll="roll.Mission" />

  <o-btns
    save
    @save="btns.Save"
    initial
    @initial="btns.Initial"
    clear
    @clear="btns.Clear"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ERegion, IStarship } from 'src/components/models';
import { tableRoll } from 'src/lib/roll';
import { Starship } from 'src/lib/oracles/starship';
import OInput from './OInput.vue';
import OBtns from './OBtns.vue';
export default defineComponent({
  components: { OInput, OBtns },
  name: 'Starship',
  props: {
    modelValue: {
      type: Object as PropType<IStarship>,
    },
  },
  setup(props) {
    const data = ref(props.modelValue || <IStarship>{});
    const regionSelect = ref(ERegion.Terminus);

    const roll = {
      Name: () => {
        data.value.name = tableRoll(Starship.name);
      },
      Class: () => {
        let c = tableRoll(Starship.class);
        c = /roll twice/i.test(c)
          ? `${tableRoll(Starship.class)}, ${tableRoll(Starship.class)}`
          : c;
        c = /▶️Fleet/i.test(c) ? `Fleet: ${tableRoll(Starship.fleet)}` : c;
        c = /▶️Starship Mission/i.test(c)
          ? `Starship Mission: ${tableRoll(
              Starship.mission[regionSelect.value]
            )}`
          : c;
        data.value.class = c;
      },
      Fleet: () => {
        data.value.fleet = tableRoll(Starship.fleet);
      },
      Cont: () => {
        data.value.initialContact = tableRoll(Starship.initialContact);
      },
      First: () => {
        const f = tableRoll(Starship.firstLook);
        data.value.firstLook
          ? (data.value.firstLook += ', ' + f)
          : (data.value.firstLook = f);
      },
      Mission: () => {
        data.value.mission = tableRoll(Starship.mission[regionSelect.value]);
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
      Save: () => {
        alert('Not implemented yet');
      },
    };

    return {
      data,
      regionSelect,
      ERegion,

      roll,
      btns,
    };
  },
});
</script>
