<template>
  <div class="q-pa-sm card-bg rounded-borders">
    <div class="row q-gutter-sm" v-if="showName">
      <i-input class="col-grow" v-model="data.name" @update:modelValue="updateValue" autogrow />
      <slot name="action" class="col-shrink" />
    </div>

    <div v-if="rollData.result" class="col-12 text-h6">
      <div class="row text-center items-center justify-evenly">
        <div :class="rollData.action.color">
          {{ rollData.result }}
          <span v-if="rollData.challenge.match">with a match</span>:
        </div>
        <span :class="rollData.action.color"> {{ rollData.action.score }}</span>
        <span> vs </span> <span :class="rollData.challenge.die1.color"> {{ rollData.challenge.die1.roll }}</span>
        <span>|</span>
        <span :class="rollData.challenge.die2.color">{{ rollData.challenge.die2.roll }}</span>
        <q-btn icon="mdi-close-circle" flat dense :size="btnSize" @click="rollData.result = ''">
          <q-tooltip>Clear roll result</q-tooltip>
        </q-btn>
      </div>
    </div>

    <div class="row justify-evenly">
      <q-btn label="Mark" dense :size="btnSize" flat @click="mark" />
      <q-btn
        v-for="(value, index) in data.boxes"
        :key="index"
        flat
        dense
        :size="btnSize"
        :icon="boxIcon(value)"
        @click="boxIncrement(index)"
      />
      <q-btn icon="mdi-dice-6" flat dense :size="btnSize" @click="conclude">
        <q-tooltip>Make a progress roll</q-tooltip>
      </q-btn>
    </div>

    <div class="row justify-center items-center" v-if="showDifficulty">
      <q-btn-toggle
        dense
        flat
        :size="btnSize"
        v-model="data.difficulty"
        :options="diffOpts"
        @update:modelValue="updateValue"
      />
      <q-btn :icon="clockIcon" flat dense :size="btnSize" @click="showClocks = !showClocks">{{
        clockIndices.length
      }}</q-btn>
      <q-btn :icon="notesIcon" flat dense :size="btnSize" @click="showNotes = !showNotes" />
    </div>

    <div v-if="showNotes" class="q-mt-sm">
      <i-input v-model="data.notes" autogrow label="Notes" />
    </div>

    <div v-if="showClocks">
      <clocks v-model="data.clocks" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue';

import { IProgressTrack } from 'src/components/models';

import { useQuasar } from 'quasar';
import { useCampaign } from 'src/store/campaign';

import { boxIcon, Difficulty } from 'src/lib/tracks';
import { moveRoll, NewRollData } from 'src/lib/roll';
import { sleep } from 'src/lib/util';

import IInput from 'src/components/Widgets/IInput.vue';
import Clocks from 'src/components/Tracks/Clocks.vue';

export default defineComponent({
  name: 'ProgressTrack',
  components: { IInput, Clocks },
  props: {
    modelValue: {
      type: Object as PropType<IProgressTrack>,
      required: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
    showDifficulty: {
      type: Boolean,
      default: true,
    },
    setDifficulty: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const data = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );

    const updateValue = () => ctx.emit('update:modelValue', data.value);

    // Set difficulty externally
    if (props.setDifficulty !== 0) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      data.value.difficulty = props.setDifficulty;
    }

    const boxIncrement = (index: number) => {
      if (data.value.boxes[index] === 4) {
        data.value.boxes[index] = 0;
      } else {
        data.value.boxes[index]++;
      }
      updateValue();
    };

    const diffOpts = [
      { label: Difficulty[1].label, value: 1 },
      { label: Difficulty[2].label, value: 2 },
      { label: Difficulty[3].label, value: 3 },
      { label: Difficulty[4].label, value: 4 },
      { label: Difficulty[5].label, value: 5 },
    ];

    const mark = () => {
      let ticks = Difficulty[data.value.difficulty].mark * 4;

      void (async () => {
        for (let i = 0; i < data.value.boxes.length; i++) {
          while (data.value.boxes[i] < 4 && ticks > 0) {
            data.value.boxes[i]++;
            ticks--;
            await sleep(100);
          }
        }
        updateValue();
        campaign.appendToJournal(
          0,
          `<div class="note progress"><b>[Mark Progress: ${data.value.name} :${actionScore.value} boxes]</b>&nbsp;</div>`
        );
      })();
    };

    const $q = useQuasar();
    const btnSize = computed(() => {
      if ($q.screen.lt.sm) {
        return 'sm';
      }
      return 'md';
    });

    const actionScore = computed((): number => {
      let n = 0;
      data.value.boxes.forEach((b) => {
        if (b === 4) {
          n++;
        }
      });
      return n;
    });
    const rollData = ref(NewRollData());
    const conclude = () => {
      rollData.value = moveRoll(0, 0, 0, actionScore.value);

      campaign.appendToJournal(
        0,
        `<div class="note progressroll"><b>[Progress Roll: ${data.value.name} :${rollData.value.result} = ${rollData.value.action.score} vs ${rollData.value.challenge.die1.roll} | ${rollData.value.challenge.die2.roll}]</b>&nbsp;</div>`
      );
    };

    const campaign = useCampaign();
    const showClocks = ref(false);
    const clockIcon = computed(() => (showClocks.value ? 'mdi-clock-time-two' : 'mdi-clock-time-two-outline'));
    const clockIndices = computed(() => {
      const out: number[] = [];
      if (!data.value.clocks) return out;
      data.value.clocks.forEach((id) => {
        campaign.data.character.clocks.forEach((c, i) => {
          if (c.id === id) {
            out.push(i);
          }
        });
      });
      return out;
    });
    const showNotes = ref(false);
    const notesIcon = computed(() => (showNotes.value ? 'mdi-note' : 'mdi-note-outline'));
    if (data.value.notes === undefined) {
      data.value.notes = '';
    }

    return {
      data,
      boxIncrement,
      boxIcon,
      diffOpts,
      mark,
      updateValue,
      btnSize,

      conclude,
      rollData,

      showClocks,
      clockIcon,
      clockIndices,

      showNotes,
      notesIcon,
      campaign,
    };
  },
});
</script>
