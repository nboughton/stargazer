<template>
  <div>
    <div class="row q-gutter-sm q-mb-sm items-center justify-center" v-if="all && app.ca.clocks.length > 0">
      <q-btn label="Begin a Session" flat dense @click="rollAllClocks" />
    </div>

    <div class="row q-gutter-sm q-mb-sm items-center" v-if="!all">
      <q-select class="col" label="Clock" v-model="clockSelect" :options="clockOpts" dense emit-value map-options />
      <q-btn class="col-shrink" icon="remove_circle" flat dense @click="unlinkClock(clockSelect)" />
      <q-btn class="col-shrink" icon="add_circle" flat dense @click="addClock(clockSelect)" />
    </div>

    <div class="row q-gutter-sm justify-evenly" v-if="!all">
      <clock v-for="index in clockIndices" :key="index" v-model="app.ca.clocks[index]" @delete="removeClock(index)" />
    </div>

    <div class="row q-gutter-sm justify-evenly" v-else>
      <clock
        v-for="(clock, index) in app.ca.clocks"
        :key="index"
        v-model="app.ca.clocks[index]"
        @delete="removeClock(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';

import { EAtO, ISelectOpt } from '../models';

import { useCampaign } from 'src/store/campaign';

import { NewClock, RollClock } from 'src/lib/tracks';

import Clock from 'src/components/Tracks/Clock.vue';

export default defineComponent({
  name: 'Clocks',
  components: { Clock },
  props: {
    all: {
      type: Boolean,
    },
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => {
        return [];
      },
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const idList = computed({
      get() {
        return props.modelValue;
      },
      set(value: string[]) {
        return emit('update:modelValue', value);
      },
    });

    const app = useCampaign();
    const clockSelect = ref('');

    const clockIndices = computed(() => {
      const out: number[] = [];
      if (!idList.value) return out;
      idList.value.forEach((id) => {
        app.ca.clocks.forEach((c, i) => {
          if (c.id === id) {
            out.push(i);
          }
        });
      });
      return out;
    });
    const clockOpts = computed(() => {
      const out: ISelectOpt[] = [{ label: 'New', value: 'new' }];
      app.ca.clocks.forEach((c) => {
        out.push({
          label: c.name,
          value: c.id,
        });
      });
      return out;
    });

    const addClock = (id: string) => {
      if (id === 'new') {
        const c = NewClock();
        app.ca.clocks.unshift(c);
        idList.value.unshift(c.id);
        return;
      }
      idList.value.unshift(id);
    };
    const unlinkClock = (id: string) => {
      idList.value.forEach((c, i) => {
        if (c === id) idList.value.splice(i, 1);
      });
    };
    const removeClock = (index: number) => {
      app.ca.clocks.splice(index, 1);
    };

    const rollAllClocks = () => {
      app.ca.clocks.forEach((clock, index) => {
        if (clock.advance !== EAtO.NoRoll) {
          app.ca.clocks[index] = RollClock(clock);
        }
      });
    };

    return {
      addClock,
      unlinkClock,
      removeClock,
      clockIndices,
      clockOpts,
      clockSelect,
      rollAllClocks,
      app,
    };
  },
});
</script>
