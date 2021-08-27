<template>
    <q-input
      class="col-xs-2 col-sm-1 col-1"
      type="number"
      :min="0"
      :max="4"
      v-model="data"
      :label="label"
      @update:modelValue="updateValue"
      standout="bg-blue-grey text-white"
      :input-style="{ color: '#ECEFF4', fontSize: '2em' }"
      debounce="750"
    />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'Stats',
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = ref(+props.modelValue)
    watch(() => props.modelValue, () => (data.value = +props.modelValue))

    const updateValue = () => ctx.emit('update:modelValue', data.value)

    return {
      updateValue,
      data
    }
  }
})
</script>
