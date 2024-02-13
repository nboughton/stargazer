<template>
  <div class="q-mb-md">
    <div class="row text-h4 items-baseline">
      <q-avatar :icon="icon.truth(label)" />
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
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="rollMain" />
    </div>

    <div class="row items-center" v-if="subOpts.length > 0">
      <q-select class="col-grow" label="Select" v-model="subOptSelect" :options="subOpts" dense borderless />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense @click="rollSub" />
    </div>

    <q-input label="Text" v-model="app.ca.truths[id]" dense outlined autogrow />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import { ISelectOpt } from 'src/components/models';

import { useCampaign } from 'src/store/campaign';

import { icon } from 'src/lib/icons';
import { starforged } from 'dataforged';
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
  },
  setup(props) {
    const app = useCampaign();

    const truth = starforged['Setting Truths'].find((t) => t.Name === props.label);
    if (!truth) alert(`No truth found for ${props.label}`);

    const subOptSelect = ref('');
    let subOpts = ref([] as string[]);

    // I'm going to be doing this a few times
    const truncate = (s: string): string => s.substring(0, 30) + '...';

    const optSelect = ref('');
    const optID = ref(0);
    const opts = (): ISelectOpt[] => {
      const out: ISelectOpt[] = [];
      truth?.Table.forEach((t) => {
        out.push({ label: truncate(t.Result), value: `${t.Result} ${t.Description}` });
      });
      return out;
    };

    watch(
      () => optSelect.value,
      () => {
        subOpts.value = [];
        truth?.Table.forEach((t, i) => {
          const r = new RegExp(`^${truncate(t.Result)}`);
          if (r.test(optSelect.value)) {
            app.ca.truths[props.id] = `${t.Result} ${t.Description}`;
            console.log(t);
            if (t.Subtable) {
              optID.value = i;
              t.Subtable.forEach((i) => {
                subOpts.value.push(i.Result);
              });
            }
          }
        });
      }
    );

    watch(
      () => subOptSelect.value,
      () => {
        app.ca.truths[props.id] += '\n\n' + subOptSelect.value;
      }
    );

    const rollMain = () => (optSelect.value = truncate(oracle.truth(truth?.$id as string, -1).Result));

    const rollSub = () => (subOptSelect.value = oracle.truth(truth?.$id as string, optID.value).Result);

    return {
      app,
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
