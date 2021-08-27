<template>
  <div>
    <!-- character -->
    <div class="row full-width q-pb-sm">
      <q-select class="col-grow" :label="label" :options="tables" v-model="select" dense />
      <q-btn class="col-shrink" icon="mdi-dice-6" @click="click" flat dense>
        <q-tooltip>Roll on the oracle</q-tooltip>
      </q-btn>
      <q-btn class="col-shrink" icon="clear" @click="results = []" flat dense>
        <q-tooltip>Clear results</q-tooltip>
      </q-btn>
    </div>
    <span v-for="(item, index) in results" :key="index" class="q-pa-sm">
      {{ item }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { IOracle } from './models'
import { oracleRoll } from 'src/lib/roll'

export default defineComponent({
  name: 'Oracles',
  props: {
    label: {
      type: String
    },
    oracle: {
      type: Object as PropType<{ [index: string]: IOracle}>,
      required: true
    }
  },
  setup(props) {
    const tables = Object.keys(props.oracle)
    const select = ref('')
    const results = ref([] as string[])
    const click = () => (results.value.push(select.value + ': ' + oracleRoll(props.oracle[select.value])))

    return {
      tables,
      select,
      results,
      click
    }
  }
})
</script>
