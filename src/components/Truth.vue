<template>
  <div class="q-pb-md">
    <!-- content -->
    <div class="row items-center q-pb-sm">
      <div class="col-shrink text-h5 q-pr-sm">{{ label }}</div>
      <q-select
        class="col-grow"
        v-model="select"
        :options="optsFn(id)"
        map-options
        emit-value
        dense
        label="Select one or write your own..."
      />
    </div>
    <q-input v-model="data" autogrow dense standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" debounce="750" />
  </div>
</template>

<script lang="ts">
import { ISelectOpt } from 'src/components/models'
import { Truths } from 'src/lib/truths'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'Truths',
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = ref(props.modelValue)
    watch(() => props.modelValue,
      () => (data.value = props.modelValue)
    )
    watch(() => data.value,
      () => ctx.emit('update:modelValue', data.value)
    )

    const select = ref('')
    watch(() => select.value,
      () => (data.value = select.value)
    )
    const optsFn = (label: string): ISelectOpt[] => {
      const out: ISelectOpt[] = []
      Truths[label].forEach(t => {
        out.push({ label: `${t.substring(0, 70)}...`, value: t })
      })
      return out
    }

    return {
      data,
      select,
      optsFn
    }
  }
})
</script>
