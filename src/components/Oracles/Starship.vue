<template>
  <div>
    <q-input label="Name" v-model="data.name" />
    <q-input label="Class" v-model="data.class" />
    <q-input label="Fleet" v-model="data.fleet" />
    <q-input label="Initial Contact" v-model="data.initialContact" />
    <q-input label="First Look" v-model="data.firstLook" />
    <q-input label="Mission" v-model="data.mission" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { IStarship } from 'src/components/models';
export default defineComponent({
  name: 'Starship',
  props: {
    modelValue: {
      type: Object as PropType<IStarship>,
      required: true,
    },
  },
  setup(props) {
    const data = ref(props.modelValue);

    return {
      data,
    };
  },
});
</script>
