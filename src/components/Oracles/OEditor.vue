<template>
  <q-card>
    <!-- editor column-->
    <q-card-section class="row full-width q-gutter-sm items-baseline">
      <q-input class="col-grow" label="Name" v-model="data.Name" />
      <span>Dice:</span>
      <q-select :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" v-model="diceNum" dense outlined :placeholder="1" />
      <span>d</span>
      <q-select :options="[2, 4, 6, 8, 10, 12, 20, 100]" v-model="diceSize" dense outlined :placeholder="100" />
      <!--q-input class="col" label="Dice" v-model="data.Dice" dense placeholder="1d100" /-->
    </q-card-section>

    <q-card-section>
      <div class="row justify-between items-center q-ml-sm">
        <div class="col-grow text-bold">Add Row</div>
        <q-btn class="col-shrink" icon="add_circle" flat dense @click="addRow" />
      </div>
      <div class="row q-ml-sm" v-for="(row, index) of data.Table" :key="index">
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
import { computed, defineComponent, PropType, ref, watch } from 'vue';

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

    // This is lazy, probably needs to be more robust
    const splitD = data.value.Dice?.split('d') as string[];
    const diceNum = ref(+splitD[0]);
    const diceSize = ref(+splitD[1]);
    const diceStr = computed((): string => `${diceNum.value}d${diceSize.value}`);
    watch(
      () => diceStr.value,
      () => (data.value.Dice = diceStr.value)
    );

    // TODO:
    //  [*] validate dice string before saving
    //  [*] first row should reflect min dice n
    //  [*] subsequent rows should set floor to prev row floor + 1
    //  [ ] validate that all results are valid and no crossover
    const addRow = () => {
      if (data.value.Table) {
        data.value.Table.length === 0
          ? data.value.Table.push({ Floor: diceNum.value, Ceiling: diceNum.value + 1, Result: '' })
          : data.value.Table.push({
              Floor: data.value.Table[data.value.Table.length - 1].Ceiling,
              Ceiling: (data.value.Table[data.value.Table.length - 1].Ceiling as number) + 1,
              Result: '',
            });
      }
    };
    const removeRow = (index: number) => data.value.Table?.splice(index, 1);
    const save = () => oracles.save(data.value);

    return {
      data,
      diceNum,
      diceSize,
      addRow,
      removeRow,
      save,
    };
  },
});
</script>
