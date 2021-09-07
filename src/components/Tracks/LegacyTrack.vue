<template>
  <div class="row items-center justify-between">
    <span class="text-h5 custom-header">{{ name }}</span>
    <q-checkbox label="+10" v-model="data.plus10" @click="p10" />
  </div>

  <div class="row no-wrap items-center justify-between q-mb-md">
    <div class="column items-center" v-for="(box, i) in data.boxes" :key="i">
      <div class="row">
        <q-btn :icon="boxIcon(data.boxes[i].ticks)" flat dense :size="boxSize" @click="boxIncrement(i)" />
      </div>
      <div class="row">
        <q-checkbox v-model="data.boxes[i].xp[0]" dense :size="checkSize" @click="updateValue" />
        <q-checkbox v-if="!data.plus10" v-model="data.boxes[i].xp[1]" dense :size="checkSize" @click="updateValue" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, computed } from 'vue';
import { ILegacyTrack } from '../models';
import { boxIcon } from 'src/lib/tracks';
import { useQuasar } from 'quasar';
export default defineComponent({
  name: 'LegacyTrack',
  props: {
    modelValue: {
      type: Object as PropType<ILegacyTrack>,
      required: true,
    },
    name: {
      type: String,
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

    const boxIncrement = (index: number) => {
      if (data.value.boxes[index].ticks === 4) {
        data.value.boxes[index].ticks = 0;
      } else {
        data.value.boxes[index].ticks++;
      }
      updateValue();
    };

    const full = (): boolean => {
      let f = true;
      data.value.boxes.forEach((b) => {
        if (b.ticks !== 4) f = false;
        return;
      });
      return f;
    };

    const p10 = () => {
      if (data.value.plus10 && full())
        data.value.boxes.forEach((b, i) => {
          data.value.boxes[i].ticks = 0;
          data.value.boxes[i].xp = [false, false];
        });
      else data.value.plus10 = false;
      updateValue();
    };

    const $q = useQuasar();
    const boxSize = computed(() => {
      if ($q.screen.lt.sm) {
        return 'md';
      }
      return 'xl';
    });
    const checkSize = computed(() => {
      if ($q.screen.lt.sm) {
        return 'xs';
      }
      return 'sm';
    });

    return {
      data,
      boxSize,
      checkSize,
      boxIcon,
      boxIncrement,
      updateValue,
      p10,
    };
  },
});
</script>
