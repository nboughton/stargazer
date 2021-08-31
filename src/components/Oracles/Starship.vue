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

  <o-input label="First Look" v-model="data.firstLook" @roll="roll.First" />

  <o-input label="Mission" v-model="data.mission" @roll="roll.Mission" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { ERegion, IStarship } from 'src/components/models';
import { tableRoll } from 'src/lib/roll';
import { Starship } from 'src/lib/oracles/starship';
import OInput from './OInput.vue';
export default defineComponent({
  components: { OInput },
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
        data.value.class = tableRoll(Starship.class);
      },
      Fleet: () => {
        data.value.fleet = tableRoll(Starship.fleet);
      },
      Cont: () => {
        data.value.initialContact = tableRoll(Starship.initialContact);
      },
      First: () => {
        data.value.firstLook = tableRoll(Starship.firstLook);
      },
      Mission: () => {
        data.value.mission = tableRoll(Starship.mission[regionSelect.value]);
      },
    };

    return {
      data,
      regionSelect,
      ERegion,

      roll,
    };
  },
});
</script>
