<template>
  <q-card>
    <!-- editor column-->
    <q-card-section class="row full-width items-baseline">
      <q-input class="col-xs-12 col-md-6" label="Name" v-model="data.Name" />
      <div class="col-xs-12 col-md-6">
        <div class="row items-baseline q-gutter-xs">
          <span class="col-shrink">Dice:</span>
          <q-select class="col" :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" v-model.number="diceNum" dense outlined />
          <span class="col-shrink">d</span>
          <q-select class="col" :options="[2, 4, 6, 8, 10, 12, 20, 100]" v-model.number="diceSize" dense outlined />
        </div>
        <div class="col-12 q-mt-xs">
          <div class="text-subtitle2 text-right">Dice range: {{ diceNum }} - {{ diceNum * diceSize }}</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row justify-between items-center q-ml-sm">
        <div class="col-grow text-bold">Add Row</div>
        <q-btn class="col-shrink" icon="add_circle" flat dense @click="addRow" />
      </div>
      <div class="row q-ml-sm items-center" v-for="(row, index) of data.Table" :key="index">
        <q-input class="col-2" type="number" v-model.number="data.Table![index].Floor" label="Floor" dense />
        <q-input class="col-2" type="number" v-model.number="data.Table![index].Ceiling" label="Ceiling" dense />
        <q-input class="col" v-model="data.Table![index].Result" label="Result Text" dense />
        <q-icon class="col-shrink q-px-xs" v-if="badRows[index]" name="error" color="negative" size="sm">
          <q-tooltip>{{ badRows[index].join(', ') }}</q-tooltip>
        </q-icon>
        <q-btn class="col-shrink" icon="delete" flat dense @click="removeRow(index)">
          <q-tooltip>Remove row</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>
    <q-card-actions class="justify-between row">
      <div class="col-shrink">
        <q-btn label="Delete" flat class="self-start" color="warning" @click="del" />
      </div>
      <div class="col-shrink">
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
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';

import { ICustomOracle } from '../models';

import { useOracles } from 'src/store/oracles';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'OEditor',
  props: {
    oracle: {
      type: Object as PropType<ICustomOracle>,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const oracles = useOracles();
    const data = ref(props.oracle);

    // This is lazy, probably needs to be more robust
    const splitD = data.value.Dice?.split('d') as string[];
    const diceNum = ref(+splitD[0]);
    const diceSize = ref(+splitD[1]);
    watch(
      () => [diceNum.value, diceSize.value],
      () => (data.value.Dice = `${diceNum.value}d${diceSize.value}`)
    );

    const addRow = () => {
      if (data.value.Table) {
        if (data.value.Table.length === 0) {
          data.value.Table.push({ Floor: diceNum.value, Ceiling: diceNum.value + 1, Result: '' });
        } else {
          const n = data.value.Table[data.value.Table.length - 1].Ceiling as number;
          data.value.Table.push({
            Floor: n + 1,
            Ceiling: n + 2,
            Result: '',
          });
        }
      }
    };
    const removeRow = (index: number) => {
      $q.notify({
        message: 'Delete this row?',
        color: 'warning',
        textColor: 'dark',
        position: 'center',
        timeout: 0,
        actions: [
          {
            label: 'Yes',
            color: 'negative',
            handler: () => {
              data.value.Table?.splice(index, 1);
            },
          },
          {
            label: 'No',
            color: 'dark',
            handler: () => {
              console.log('No toucha da fishie');
            },
          },
        ],
      });
    };

    interface IBadRows {
      [index: number]: string[];
    }
    const badRows = computed((): IBadRows => {
      const rows: IBadRows = {};
      const min = diceNum.value;
      const max = diceNum.value * diceSize.value;

      const numbers: { [index: number]: number } = {};

      data.value.Table?.forEach((r, i) => {
        const f = r.Floor != null ? +r.Floor : 0;
        const c = r.Ceiling != null ? +r.Ceiling : 0;

        if (c < f) {
          if (!rows[i]) rows[i] = [];
          rows[i].push('Ceiling lower than Floor');
        }

        // Check floor/ceiling don't fall outside of min/max
        if (f < min || f > max) {
          if (!rows[i]) rows[i] = [];
          rows[i].push(`cannot roll ${f} with ${diceNum.value}d${diceSize.value}`);
        }

        if (c < min || c > max) {
          if (!rows[i]) rows[i] = [];
          rows[i].push(`cannot roll ${c} with ${diceNum.value}d${diceSize.value}`);
        }

        // Collate every possible result range to check for overlaps
        for (let n = f; n <= c; n++) {
          numbers[n] ? numbers[n]++ : (numbers[n] = 1);

          if (numbers[n] > 1) {
            if (!rows[i]) rows[i] = [];
            rows[i].push(`result number duplicate: ${n}`);
          }
        }
      });
      return rows;
    });

    const save = () => oracles.save(data.value);

    const del = () =>
      $q.notify({
        message: 'Delete this Oracle?',
        color: 'warning',
        textColor: 'dark',
        position: 'center',
        timeout: 0,
        actions: [
          {
            label: 'Yes',
            color: 'negative',
            handler: () => {
              oracles.delete(data.value).catch((err) => console.log(err));
              emit('close');
            },
          },
          {
            label: 'No',
            color: 'dark',
            handler: () => {
              console.log('No toucha da fishie');
            },
          },
        ],
      });

    return {
      data,
      diceNum,
      diceSize,
      addRow,
      removeRow,
      save,
      del,
      badRows,
    };
  },
});
</script>
