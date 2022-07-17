<template>
  <div class="row justify-evenly q-gutter-xs">
    <stat class="col-2" v-model.number="data.edge" label="Edge" />
    <stat class="col-2" v-model.number="data.heart" label="Heart" />
    <stat class="col-2" v-model.number="data.iron" label="Iron" />
    <stat class="col-2" v-model.number="data.shadow" label="Shadow" />
    <stat class="col-2" v-model.number="data.wits" label="Wits" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import Stat from 'src/components/Stats/Stat.vue';
import { IStats } from '../models';
export default defineComponent({
  name: 'Stats',
  components: { Stat },
  props: {
    modelValue: {
      type: Object as PropType<IStats>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );

    const updateValue = () => ctx.emit('update:modelValue', data.value);

    return {
      updateValue,
      data,
    };
  },
});
</script>
