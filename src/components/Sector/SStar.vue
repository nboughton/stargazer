<template>
  <div>
    <q-expansion-item :icon="icon.star()" header-class="star-header text-h5 custom-header rounded-borders shadow-1 q-mb-sm" :label="data.name" caption="Star">
      <div class="q-mt-sm">
        <controls v-if="controls" @move="$emit('move', $event)" />
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
import Controls from './Controls.vue';
import { IStar } from '../models';
import { icon } from 'src/lib/icons';

export default defineComponent({
  components: { IInput, Controls },
  name: 'SStar',
  props: {
    modelValue: {
      type: Object as PropType<IStar>,
      required: true,
    },
    controls: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'delete', 'move'],
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

    return { data, config, icon };
  },
});
</script>

<style lang="sass">
.star-header
  background-color: $star
  text-shadow: 1px 1px 1px $dark-page
</style>
