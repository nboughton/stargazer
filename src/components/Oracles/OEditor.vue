<template>
  <q-card>
    <!-- editor column-->
    <q-card-section class="row full-width items-baseline">
      <q-input class="col-xs-12 col-md-6" :label="$t('common.name')" v-model="data.Name" />
      <div class="col-xs-12 col-md-6">
        <div class="row items-baseline q-gutter-xs">
          <span class="col-shrink">{{ $t('oracles.editor.dice') }}</span>
          <q-select class="col" :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" v-model.number="diceNum" dense outlined />
          <span class="col-shrink">d</span>
          <q-select class="col" :options="[2, 4, 6, 8, 10, 12, 20, 100]" v-model.number="diceSize" dense outlined />
        </div>
        <div class="col-12 q-mt-xs">
          <div class="text-subtitle2 text-right">
            {{ $t('oracles.editor.diceRange', { min: diceNum, max: diceNum * diceSize }) }}
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row q-ml-sm items-center q-mb-sm" v-for="(row, index) of data.Table" :key="index">
        <q-input class="col-2" type="number" v-model.number="data.Table![index].Floor" :label="$t('oracles.editor.floor')" dense />
        <q-input class="col-2" type="number" v-model.number="data.Table![index].Ceiling" :label="$t('oracles.editor.ceiling')" dense />
        <q-input class="col" v-model="data.Table![index].Result" :label="$t('oracles.editor.resultText')" dense />
        <q-icon class="col-shrink q-px-xs" v-if="badRows[index]" name="error" color="negative" size="sm">
          <q-tooltip>{{ badRows[index].join(', ') }}</q-tooltip>
        </q-icon>
        <q-btn class="col-shrink" icon="delete" flat dense @click="removeRow(index)">
          <q-tooltip>{{ $t('oracles.editor.removeRow') }}</q-tooltip>
        </q-btn>
      </div>
      <div class="row justify-between items-center q-ml-sm">
        <div class="col-grow text-bold">{{ $t('oracles.editor.addRow') }}</div>
        <q-btn class="col-shrink" icon="add_circle" flat dense @click="addRow" />
      </div>
    </q-card-section>
    <q-card-actions class="justify-between row">
      <div class="col-shrink">
        <q-btn :label="$t('common.delete')" flat class="self-start" color="warning" @click="del" v-if="isExistingOracle" />
      </div>
      <div class="col-shrink">
        <q-btn
          :label="$t('common.save')"
          flat
          color="positive"
          @click="
            save();
            $emit('close');
          "
        />
        <q-btn :label="$t('common.close')" flat color="negative" @click="$emit('close')" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

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
    const { t } = useI18n();
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
    const removeRow = (index: number) =>
      $q
        .dialog({
          title: t('oracles.editor.deleteRowConfirm'),
          cancel: true,
        })
        .onOk(() => data.value.Table?.splice(index, 1));

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
          rows[i].push(t('oracles.editor.ceilingLowerThanFloor'));
        }

        // Check floor/ceiling don't fall outside of min/max
        if (f < min || f > max) {
          if (!rows[i]) rows[i] = [];
          rows[i].push(t('oracles.editor.cannotRoll', { val: f, dice: `${diceNum.value}d${diceSize.value}` }));
        }

        if (c < min || c > max) {
          if (!rows[i]) rows[i] = [];
          rows[i].push(t('oracles.editor.cannotRoll', { val: c, dice: `${diceNum.value}d${diceSize.value}` }));
        }

        // Collate every possible result range to check for overlaps
        for (let n = f; n <= c; n++) {
          numbers[n] ? numbers[n]++ : (numbers[n] = 1);

          if (numbers[n] > 1) {
            if (!rows[i]) rows[i] = [];
            rows[i].push(t('oracles.editor.duplicateResult', { n }));
          }
        }
      });
      return rows;
    });

    const save = () => oracles.save(data.value);

    const del = () =>
      $q
        .dialog({
          title: t('oracles.editor.deleteOracleConfirm'),
          cancel: true,
        })
        .onOk(() => {
          oracles.delete(data.value).catch((err) => console.log(err));
          emit('close');
        });

    const isExistingOracle = computed((): boolean => {
      return oracles.data.findIndex((oracle) => oracle.$id == data.value.$id) != -1;
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
      isExistingOracle,
    };
  },
});
</script>
