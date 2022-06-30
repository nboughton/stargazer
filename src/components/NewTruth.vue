<template>
  <div class="q-mb-md">
    <div class="row text-h4 items-baseline">
      <q-avatar :icon="icon.truth(label)" />
      <div class="col-shrink sf-header q-mr-sm">{{ label }} - new</div>
    </div>

    <div class="row items-center no-wrap">
      <q-select
        class="col-grow"
        label="Select one, write your own or roll..."
        v-model="optSelect"
        map-options
        emit-value
        :options="opts()"
        dense
        borderless
      />
      <q-btn class="col-shrink" icon="mdi-dice-6" flat dense />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { truth, truthOpts } from 'src/lib/oracles';
import { icon } from 'src/lib/icons';
import { ISelectOpt } from './models';
export default defineComponent({
  name: 'NewTruth',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const optSelect = ref(null);
    const opts = (): ISelectOpt[] => {
      const out: ISelectOpt[] = [];
      truthOpts(props.label.replace(' ', '_'), -1).forEach((o) => {
        out.push({
          label: o.Summary as string,
          value: o.Result,
        });
      });
      return out;
    };

    const subOptSelect = ref(null);
    const subOpts = computed((): ISelectOpt[] => {
      let out: ISelectOpt[] = [];

      return out;
    });

    console.log(truth(props.label.replace(' ', '_'), -1));

    return {
      icon,
      opts,
      optSelect,
      subOpts,
      subOptSelect,
    };
  },
});
</script>
