<template>
  <div class="hexbox row items-center" @click="$emit('update:modelValue', !data)" :title="label">
    <svg class="box" viewBox="0 0 26 26" width="28" height="28">
      <polygon :class="{ hex: true, checked: data }" points="15,5 25,10 25,20 15,25 5,20 5,10" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Hexbox',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const data = computed(() => {
      return props.modelValue;
    });

    return {
      data,
    };
  },
});
</script>

<style lang="sass">
.hexbox
  padding: 0
  margin: 0
  cursor: pointer

.box polygon.hex
  transition: fill 0.3s ease
  fill: #D8DEE9
  stroke: $dark
  stroke-width: 2

.box polygon.checked
  transition: fill 0.3s ease
  fill: $primary

.box > polygon.filler
  fill: $accent
  scale: 0.5
</style>
