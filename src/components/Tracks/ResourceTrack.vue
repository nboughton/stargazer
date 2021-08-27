<template>
  <q-btn-toggle spread unelevated dense :options="opts" v-model="data.value" @update:modelValue="updateValue"/>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { IMomentum, ISelectOpt, ITrack } from 'src/components/models'

export default defineComponent({
  name: 'ResourceTrack',
  props: {
    modelValue: {
      type: Object as PropType<ITrack | IMomentum>,
      required: true
    },
    reverse: {
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = ref(props.modelValue)
    watch(() => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true })

    const updateValue = () => ctx.emit('update:modelValue', data)

    const opts = computed((): ISelectOpt[] => {
      const out: ISelectOpt[] = []
      for (let i = data.value.min; i <= data.value.max; i++) {
        const o: ISelectOpt = { label: i, value: i }
        if (props.reverse) {
          out.push(o)
        } else {
          out.unshift(o)
        }
      }
      return out
    })

    return {
      data,
      opts,
      updateValue
    }
  }
})
</script>
