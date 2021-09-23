<template>
  <div>
    <q-expansion-item
      :icon="icon.star(data.description)"
      header-class="star-header sf-header rounded-borders q-mb-sm"
      :label="data.name"
      caption="Star"
    >
      <div class="row q-mb-sm" v-if="controls">
        <controls class="col" @move="$emit('move', $event)" />
      </div>

      <div class="row q-gutter-sm q-mb-sm">
        <i-input class="col-grow" label="Name" v-model="data.name" />
        <q-btn class="col-shrink" v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>
      <i-input class="q-mb-sm" label="Description" v-model="data.description" autogrow />
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
