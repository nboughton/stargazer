<template>
  <div>
    <q-input label="Name" v-model="data.name" />
    <q-select
      label="Type"
      v-model="data.type"
      :options="Object.values(EPClass)"
    />
    <q-select
      label="Region"
      v-model="data.region"
      :options="Object.values(ERegion)"
    />
    <q-input label="Sector" v-model="data.sector" />
    <q-input label="Description" v-model="data.description" autogrow />
    <q-input label="Atmosphere" v-model="data.atmosphere" />
    <q-input label="Settlements" v-model="data.settlements" />
    <q-input label="Observed From Space" v-model="data.observed" />
    <q-input label="Planetside Feature" v-model="data.feature" />
    <q-input label="Life" v-model="data.life" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { IPlanet, ERegion, EPClass } from 'src/components/models';
export default defineComponent({
  name: 'Planet',
  props: {
    modelValue: {
      type: Object as PropType<IPlanet>,
      required: true,
    },
  },
  setup(props) {
    const data = ref(props.modelValue);

    return {
      data,
      ERegion,
      EPClass,
    };
  },
});
</script>
