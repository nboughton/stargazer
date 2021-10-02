<template>
  <div>
    <div
      class="row q-gutter-sm q-mb-sm items-center justify-center"
      v-if="all && campaign.data.character.clocks.length > 0"
    >
      <q-btn label="Begin a Session" flat dense @click="rollAllClocks" />
    </div>

    <div class="row q-gutter-sm q-mb-sm items-center" v-if="!all">
      <q-select class="col" label="Clock" v-model="clockSelect" :options="clockOpts" dense emit-value map-options />
      <q-btn class="col-shrink" icon="remove_circle" flat dense @click="unlinkClock(clockSelect)" />
      <q-btn class="col-shrink" icon="add_circle" flat dense @click="addClock(clockSelect)" />
    </div>

    <div class="row q-gutter-sm justify-evenly" v-if="!all">
      <clock
        v-for="index in clockIndices"
        :key="index"
        v-model="campaign.data.character.clocks[index]"
        @delete="removeClock(index)"
      />
    </div>

    <div class="row q-gutter-sm justify-evenly" v-else>
      <clock
        v-for="(clock, index) in campaign.data.character.clocks"
        :key="index"
        v-model="campaign.data.character.clocks[index]"
        @delete="removeClock(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { NewClock, RollClock } from 'src/lib/tracks';
import { useCampaign } from 'src/store/campaign';
import { defineComponent, PropType, ref, computed } from 'vue';
import { EAtO, ISelectOpt } from '../models';

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
        emit('update:modelValue', value);
      },
    });

    const campaign = useCampaign();
    const clockSelect = ref('');

    const clockIndices = computed(() => {
      const out: number[] = [];
      if (!idList.value) return out;
      idList.value.forEach((id) => {
        campaign.data.character.clocks.forEach((c, i) => {
          if (c.id === id) {
            out.push(i);
          }
        });
      });
      return out;
    });
    const clockOpts = computed(() => {
      const out: ISelectOpt[] = [{ label: 'New', value: 'new' }];
      campaign.data.character.clocks.forEach((c) => {
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
        campaign.data.character.clocks.unshift(c);
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
      campaign.data.character.clocks.splice(index, 1);
    };

    const rollAllClocks = () => {
      campaign.data.character.clocks.forEach((clock, index) => {
        if (clock.advance !== EAtO.NoRoll) {
          campaign.data.character.clocks[index] = RollClock(clock);
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
      campaign,
    };
  },
});
</script>
