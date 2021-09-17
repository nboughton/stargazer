<template>
  <q-expansion-item
    class="shadow-1"
    header-class="text-h5 bg-secondary rounded-borders"
    :label="data.title"
    :caption="data.type"
    :icon="icon.asset(data.title)"
    :style="width"
  >
    <div class="q-ma-xs q-gutter-sm">
      <div v-if="data.subtitle" v-html="data.subtitle" />
      <i-input class="q-mb-sm" v-if="data.input" :label="data.input.label" v-model="data.input.text" />
      <div v-for="(item, index) in data.items" :key="index">
        <div class="row items-start q-mb-sm">
          <q-checkbox class="col-1 asset-cb" v-model="data.items[index].marked" dense />
          <div class="col-11 q-pl-sm q-mt-xs asset-text" v-html="item.text" />
        </div>
        <div class="row justify-end">
          <i-input
            class="col-11"
            v-if="data.items[index].input"
            :label="data.items[index].input.label"
            v-model="data.items[index].input.text"
          />
        </div>
      </div>
      <div class="row justify-evenly q-gutter-sm">
        <q-checkbox v-if="data.cursed != undefined" label="Cursed" v-model="data.cursed" />
        <q-checkbox v-if="data.battered != undefined" label="Battered" v-model="data.battered" />
      </div>
      <resource-track class="row" v-if="data.track" v-model="data.track" reverse />
    </div>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue';
import IInput from '../IInput.vue';
import { IAsset } from '../models';
import { icon } from 'src/lib/icons';
import ResourceTrack from '../Tracks/ResourceTrack.vue';
import { useQuasar } from 'quasar';
export default defineComponent({
  components: { IInput, ResourceTrack },
  name: 'Asset',
  props: {
    modelValue: {
      type: Object as PropType<IAsset>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
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

    const $q = useQuasar();
    const width = computed((): string => {
      return $q.screen.lt.sm ? 'width: 90%' : '';
    });

    const expanded = ref(true);
    return {
      data,
      expanded,
      icon,
      width,
    };
  },
});
</script>
