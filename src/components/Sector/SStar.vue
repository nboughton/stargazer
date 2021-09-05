<template>
  <div class="q-gutter-sm">
    <i-input label="Name" v-model="data.name">
      <template v-slot:append v-if="config.data.edit">
        <q-btn icon="delete" flat dense @click="$emit('delete')" />
      </template>
    </i-input>
    <i-input label="Description" v-model="data.description" autogrow />
    <q-separator />
  </div>
</template>

<script lang="ts">
import { useConfig } from 'src/store/config';
import { defineComponent, PropType, ref, watch } from 'vue';
import IInput from '../IInput.vue';
import { IStar } from '../models';
export default defineComponent({
  components: { IInput },
  name: 'SStar',
  props: {
    modelValue: {
      type: Object as PropType<IStar>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'delete'],
  setup(props, { emit }) {
    const data = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );
    watch(
      () => data.value,
      () => emit('update:modelValue', data.value),
      { deep: true }
    );

    const config = useConfig();

    return { data, config };
  },
});
</script>
