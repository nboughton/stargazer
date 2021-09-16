<template>
  <div class="q-mb-md">
    <div class="row text-h4 items-center">
      <div class="col-shrink sf-header q-mr-sm">{{ label }}</div>
    </div>

    <div class="row items-center no-wrap">
      <q-select
        class="col-grow"
        label="Select one, write your own, or roll..."
        v-model="optSelect"
        map-options
        emit-value
        :options="opts()"
        dense
        borderless
      />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="rollMain(id)" />
    </div>

    <div class="row items-center" v-if="subOpts.length > 0">
      <q-select class="col-grow" label="Select" v-model="subOptSelect" :options="subOpts" dense borderless />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="rollSub" />
    </div>

    <q-input label="Text" v-model="campaign.data.truths[id]" dense outlined autogrow />
  </div>
</template>

<script lang="ts">
import { ISelectOpt } from 'src/components/models';
import { SFTruths, RollTruth } from 'src/lib/truths';
import { tableRoll } from 'src/lib/roll';
import { useCampaign } from 'src/store/campaign';
import { defineComponent, ref, watch } from 'vue';
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
  },
  setup(props) {
    const campaign = useCampaign();
    const subOptSelect = ref('');
    let subOpts = ref([] as string[]);

    const optSelect = ref('');
    const optID = ref(0);
    const opts = (): ISelectOpt[] => {
      const out: ISelectOpt[] = [];
      SFTruths[props.id].forEach((t) => {
        const opt = { label: `${t.summary.substring(0, 30)}...`, value: t.text };
        out.push(opt);
      });
      return out;
    };

    watch(
      () => optSelect.value,
      () => {
        subOpts.value = [];
        SFTruths[props.id].forEach((t, i) => {
          if (optSelect.value === t.text) campaign.data.truths[props.id] = `${t.summary} ${t.text}`;
          if (optSelect.value === t.text && t.table) {
            optID.value = i;
            t.table.items.forEach((i) => {
              subOpts.value.push(i.data);
            });
          }
        });
      }
    );

    watch(
      () => subOptSelect.value,
      () => {
        campaign.data.truths[props.id] += '\n\n' + subOptSelect.value;
      }
    );

    const rollMain = (id: string) => {
      optSelect.value = RollTruth(id);
    };

    const rollSub = () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      subOptSelect.value = tableRoll(SFTruths[props.id][optID.value].table!);
    };

    return {
      campaign,
      optSelect,
      opts,
      optID,
      subOptSelect,
      subOpts,
      RollTruth,
      rollSub,
      rollMain,
    };
  },
});
</script>
