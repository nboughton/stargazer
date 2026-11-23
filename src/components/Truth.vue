<template>
  <div class="q-mb-md" :id="id">
    <div class="row text-h4 items-baseline">
      <q-avatar :icon="icon.truth(enTruth?.Name || label)" />
      <div class="col-shrink sf-header q-mr-sm">{{ truth?.Name || label }}</div>
    </div>

    <div class="row items-center no-wrap">
      <q-select
        class="col-grow"
        :label="$t('campaign.selectTruth')"
        v-model="optSelect"
        map-options
        emit-value
        :options="opts"
        dense
        borderless
      />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="rollMain" />
    </div>

    <div class="row items-center" v-if="subOpts.length > 0">
      <q-select class="col-grow" :label="$t('common.select')" v-model="subOptSelect" :options="subOpts" dense borderless />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="rollSub" />
    </div>

    <q-input :label="$t('common.text')" v-model="campaign.data.truths[id]" dense outlined autogrow />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';

import { ISelectOpt } from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import { icon } from 'src/lib/icons';
import { translateKey } from 'src/i18n';
import { currentStarforged, starforgedEN } from 'src/lib/dataforged';
import * as oracle from 'src/lib/oracles';

export default defineComponent({
  name: 'Truths',
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    truthId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const campaign = useCampaign();

    const enTruth = starforgedEN['Setting Truths'].find((t) =>
      props.truthId ? t.$id === props.truthId : t.Name === props.label
    );
    const resolvedTruthId = props.truthId || enTruth?.$id || '';

    const truth = computed(() => {
      const found = currentStarforged.value['Setting Truths'].find((t) =>
        resolvedTruthId ? t.$id === resolvedTruthId : t.Name === props.label
      );
      return found || enTruth;
    });
    if (!truth.value) alert(translateKey('campaign.noTruthFound', { label: props.label }));

    const subOptSelect = ref('');
    const subOpts = ref([] as string[]);

    const truncate = (s: string): string => s.substring(0, 30) + '...';

    const optSelect = ref('');
    const optID = ref(0);
    const opts = computed((): ISelectOpt[] => {
      const out: ISelectOpt[] = [];
      truth.value?.Table.forEach((t) => {
        out.push({ label: truncate(t.Result), value: `${t.Result} ${t.Description || ''}`.trim() });
      });
      return out;
    });

    watch(
      () => optSelect.value,
      () => {
        subOpts.value = [];
        truth.value?.Table.forEach((t, i) => {
          const fullValue = `${t.Result} ${t.Description || ''}`.trim();
          if (optSelect.value === fullValue || optSelect.value === truncate(t.Result)) {
            campaign.data.truths[props.id] = fullValue;
            if (t.Subtable) {
              optID.value = i;
              t.Subtable.forEach((sub) => {
                subOpts.value.push(sub.Result);
              });
            }
          }
        });
      }
    );

    watch(
      () => subOptSelect.value,
      () => {
        if (subOptSelect.value) {
          campaign.data.truths[props.id] += '\n\n' + subOptSelect.value;
        }
      }
    );

    const rollMain = () => {
      const rolled = oracle.truth(truth.value?.$id as string, -1);
      if (rolled && rolled.Result) {
        optSelect.value = `${rolled.Result} ${rolled.Description || ''}`.trim();
      }
    };

    const rollSub = () => {
      const rolled = oracle.truth(truth.value?.$id as string, optID.value);
      if (rolled && rolled.Result) {
        subOptSelect.value = rolled.Result;
      }
    };

    return {
      campaign,
      enTruth,
      truth,
      optSelect,
      opts,
      optID,
      subOptSelect,
      subOpts,
      rollSub,
      rollMain,
      icon,
    };
  },
});
</script>
