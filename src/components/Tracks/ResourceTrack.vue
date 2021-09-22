<template>
  <div class="row q-gutter-sm">
    <q-btn class="col-shrink c-btn" v-if="variable" icon="mdi-numeric-negative-1" @click="decrement" dense />
    <q-btn-toggle
      class="col-grow"
      spread
      unelevated
      dense
      :options="opts"
      v-model="data.value"
      @update:modelValue="updateValue"
    />
    <q-btn class="col-shrink c-btn" v-if="variable" icon="mdi-numeric-positive-1" @click="increment" dense />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue';
import { IMomentum, ISelectOpt, ITrack } from 'src/components/models';

export default defineComponent({
  name: 'ResourceTrack',
  props: {
    modelValue: {
      type: Object as PropType<ITrack | IMomentum>,
      required: true,
    },
    reverse: {
      type: Boolean,
    },
    variable: {
      type: Boolean,
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

    const updateValue = () => ctx.emit('update:modelValue', data);

    const opts = computed((): ISelectOpt[] => {
      const out: ISelectOpt[] = [];
      for (let i = data.value.min; i <= data.value.max; i++) {
        const o: ISelectOpt = { label: i, value: i };
        if (props.reverse) {
          out.push(o);
        } else {
          out.unshift(o);
        }
      }
      return out;
    });

    const decrement = () => {
      data.value.max--;
    };

    const increment = () => {
      data.value.max++;
    };

    return {
      data,
      opts,
      increment,
      decrement,
      updateValue,
    };
  },
});
</script>

<style lang="sass">
.c-btn
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)
  background-color: $primary
</style>
