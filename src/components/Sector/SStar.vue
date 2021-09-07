<template>
  <div>
    <q-expansion-item icon="img:icons/space/star-sattelites.svg" header-class="star-header text-h5 custom-header rounded-borders shadow-1" :label="data.name" caption="Star">
      <div class="q-mt-sm">
        <i-input class="q-mb-sm" label="Name" v-model="data.name">
          <template v-slot:append v-if="config.data.edit">
            <q-btn icon="delete" flat dense @click="$emit('delete')" />
          </template>
        </i-input>
        <i-input class="q-mb-sm" label="Description" v-model="data.description" autogrow />
      </div>
    </q-expansion-item>
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

<style lang="sass">
.star-header
  background-color: $star
  text-shadow: 1px 1px 1px $dark-page
</style>
