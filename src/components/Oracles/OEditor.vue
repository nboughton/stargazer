<template>
  <q-card>
    <!-- editor column-->
    <q-card-section class="row">
      <q-input class="col-8" label="Name" v-model="data.Name" dense />
      <q-input class="col" label="Dice" v-model="data.Dice" dense placeholder="1d100" />
    </q-card-section>

    <q-card-section>
      <div class="row justify-between items-center">
        <div class="col-grow text-bold">Add Row</div>
        <q-btn class="col-shrink" icon="add_circle" flat dense @click="addRow" />
      </div>
      <div class="row" v-for="(row, index) of data.Table" :key="index">
        <q-input class="col-2" v-model="data.Table![index].Floor" label="Floor" dense />
        <q-input class="col-2" v-model="data.Table![index].Ceiling" label="Ceiling" dense />
        <q-input class="col" v-model="data.Table![index].Result" label="Result Text" dense />
        <q-btn class="col-shrink" icon="delete" flat dense @click="removeRow(index)" />
      </div>
    </q-card-section>
    <q-card-actions class="justify-end">
      <q-btn
        label="Save"
        flat
        color="positive"
        @click="
          save();
          $emit('close');
        "
      />
      <q-btn label="Close" flat color="negative" @click="$emit('close')" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import { ICustomOracle } from '../models';

import { useOracles } from 'src/store/oracles';

export default defineComponent({
  name: 'OEditor',
  props: {
    oracle: {
      type: Object as PropType<ICustomOracle>,
      required: true,
    },
  },
  emits: ['close'],
  setup(props) {
    const oracles = useOracles();
    const data = ref(props.oracle);

    const addRow = () => data.value.Table?.push({ Floor: 0, Ceiling: 0, Result: '' });
    const removeRow = (index: number) => data.value.Table?.splice(index, 1);
    const save = () => oracles.save(data.value);

    return {
      data,
      addRow,
      removeRow,
      save,
    };
  },
});
</script>
