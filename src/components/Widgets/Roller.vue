<template>
  <q-dialog
    v-model="show"
    position="bottom"
    transition-show="slide-up"
    transition-hide="slide-down"
    seamless
    class="roller"
  >
    <q-card class="column card-bg">
      <q-card-section class="row items-center justify-between q-pa-sm text-h6" v-if="d100Res > 0">
        <div class="col-shrink"><q-icon :name="`img:${icon.d10()}`" /><q-icon :name="`img:${icon.d10()}`" /></div>
        <div class="col-grow text-center">{{ d100Res }}</div>
        <q-btn class="col-shrink" dense flat icon="mdi-backspace-outline" @click="d100Res = 0" :size="btnSize" />
      </q-card-section>

      <q-card-section class="row items-center justify-between q-pa-sm text-h6" v-if="d6Res > 0">
        <div class="col-shrink"><q-icon name="mdi-dice-6" /></div>
        <div class="col-grow text-center">{{ d6Res }}</div>
        <q-btn class="col-shrink" dense flat icon="mdi-backspace-outline" @click="d6Res = 0" :size="btnSize" />
      </q-card-section>

      <q-card-section class="q-pa-sm" v-if="data.result">
        <div class="row text-center text-h6 items-center justify-center q-mb-sm">
          <div :class="data.action.color">
            {{ data.result }}
            <span v-if="data.challenge.match">with a match</span>
            <q-icon v-if="burnt" name="mdi-fire" />
          </div>
        </div>

        <div class="row items-center justify-between text-h6">
          <q-btn v-if="!burnt" :icon="adIcon" size="md" flat dense @click="reroll(true, false, false)">
            <q-tooltip>Reroll Action die</q-tooltip>
          </q-btn>
          <span v-if="!burnt">+</span>
          <span v-if="!burnt">{{ attribute }}</span>
          <span v-if="!burnt">+</span>
          <span v-if="!burnt">{{ adds }}</span>
          <span v-if="!burnt">=</span>
          <span v-if="burnt">Momentum</span>
          <span v-if="burnt">=</span>
          <span :class="data.action.color">{{ data.action.score }}</span>
          <span>vs</span>
          <q-btn :class="data.challenge.die1.color" outline round size="md" @click="reroll(false, true, false)">
            {{ data.challenge.die1.roll }}
            <q-tooltip>Reroll Challenge die</q-tooltip>
          </q-btn>

          <q-btn :class="data.challenge.die2.color" outline round size="md" @click="reroll(false, false, true)">
            {{ data.challenge.die2.roll }}
            <q-tooltip>Reroll Challenge die</q-tooltip>
          </q-btn>
          <q-btn class="col-shrink" dense flat icon="mdi-backspace-outline" @click="data.result = ''" :size="btnSize">
            <q-tooltip>Clear Roll Results</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm q-mb-none">
        <div class="row items-center justify-evenly no-wrap">
          <q-btn-toggle
            class="col-grow"
            flat
            :options="opts as unknown as any"
            label="Attribute"
            dense
            spread
            v-model="select"
            :size="btnSize"
          />

          <q-input class="col-1" type="number" label="Other" dense borderless v-model="otherAttr">
            <q-tooltip>Custom attribute value</q-tooltip>
          </q-input>

          <q-input class="col-1" type="number" label="Adds" dense borderless v-model="adds" />
        </div>
      </q-card-section>

      <q-card-section class="q-pa-sm">
        <div class="row items-center justify-between">
          <q-btn class="col-shrink" icon="expand_more" dense flat @click="close" :size="btnSize">
            <q-tooltip>Hide roller</q-tooltip>
          </q-btn>

          <q-btn class="col-shrink" dense flat @click="roll" :size="btnSize">
            <q-icon name="mdi-dice-6" />
            <q-icon :name="`img:${icon.d10()}`" />
            <q-icon :name="`img:${icon.d10()}`" />
            <q-tooltip>Roll +Attribute</q-tooltip>
          </q-btn>

          <div class="col-shrink">
            <div class="row items-center">
              <q-btn class="col-shrink" dense flat icon="remove" @click="mDec" :size="btnSize">
                <q-tooltip>Decrement Momentum</q-tooltip>
              </q-btn>
              <q-btn
                class="col-shrink"
                dense
                flat
                :label="campaign.data.character.tracks.momentum.value"
                icon="mdi-fire"
                @click="burn"
                :size="btnSize"
              >
                <q-tooltip>Burn Momentum</q-tooltip>
              </q-btn>
              <q-btn class="col-shrink" dense flat icon="add" @click="mInc" :size="btnSize">
                <q-tooltip>Increment Momentum</q-tooltip>
              </q-btn>
            </div>
          </div>

          <q-btn class="col-shrink" dense flat icon="mdi-dice-6" @click="d6" :size="btnSize">
            <q-tooltip>Roll a D6</q-tooltip>
          </q-btn>

          <q-btn class="col-shrink" dense flat @click="d100" :size="btnSize">
            <q-icon :name="`img:${icon.d10()}`" />
            <q-icon :name="`img:${icon.d10()}`" />
            <q-tooltip>Roll a D100</q-tooltip>
          </q-btn>

          <q-btn class="col-shrink" dense flat icon="save" @click="saveResult" :size="btnSize">
            <q-tooltip>Save result to most recent journal</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

import { ISelectOpt } from '../models';

import { useCampaign } from 'src/store/campaign';

import { d, moveRoll, NewRollData, updateResults } from 'src/lib/roll';
import { icon } from 'src/lib/icons';

export default defineComponent({
  name: 'Roller',
  props: {
    modelValue: {
      type: Boolean,
    },
    btnSize: {
      type: String,
      default: 'md',
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const show = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (show.value = props.modelValue)
    );
    const close = () => {
      clear();
      show.value = false;
      ctx.emit('update:modelValue', show.value);
    };
    const clear = () => {
      d100Res.value = 0;
      d6Res.value = 0;
      data.value.result = '';
      adds.value = 0;
      otherAttr.value = 0;
      burnt.value = false;
    };

    const campaign = useCampaign();
    const attribute = ref(0);
    const otherAttr = ref(0);

    const adds = ref(0);
    const opts = computed((): ISelectOpt[] => {
      return [
        { label: 'Edge', value: `edge:${campaign.data.character.stats.edge}` },
        {
          label: 'Heart',
          value: `heart:${campaign.data.character.stats.heart}`,
        },
        { label: 'Iron', value: `iron:${campaign.data.character.stats.iron}` },
        {
          label: 'Shadow',
          value: `shadow:${campaign.data.character.stats.shadow}`,
        },
        { label: 'Wits', value: `wits:${campaign.data.character.stats.wits}` },
        { label: 'Other', value: 'other' },
      ];
    });

    const select = ref('');
    watch(
      () => select.value,
      () => {
        clear();
        if (select.value.includes(':')) {
          const n = select.value.split(':')[1];
          attribute.value = +n;
        }
      }
    );

    const data = ref(NewRollData());
    const roll = () => {
      burnt.value = false;
      if (select.value === 'other') attribute.value = otherAttr.value;
      data.value = moveRoll(attribute.value, adds.value, campaign.data.character.tracks.momentum.value);
    };

    const burnt = ref(false);
    const burn = () => {
      const m = campaign.data.character.tracks.momentum.value;
      const r = campaign.data.character.tracks.momentum.reset;
      if (data.value.result && data.value.result !== 'Strong Hit' && data.value.action.score < m) {
        data.value.action.score = m;
        campaign.data.character.tracks.momentum.value = r;
        data.value = updateResults(data.value);
        burnt.value = true;
      }
    };

    const adIcon = computed(() => {
      const m = campaign.data.character.tracks.momentum.value;
      return m < 0 && Math.abs(m) === data.value.action.die
        ? `mdi-dice-${data.value.action.die}-outline`
        : `mdi-dice-${data.value.action.die}`;
    });

    const d100Res = ref(0);
    const d100 = () => (d100Res.value = d(100));

    const d6Res = ref(0);
    const d6 = () => (d6Res.value = d(6));

    const reroll = (action: boolean, cd1: boolean, cd2: boolean) => {
      if (action) data.value.action.die = d(6);
      if (cd1) data.value.challenge.die1.roll = d(10);
      if (cd2) data.value.challenge.die2.roll = d(10);

      data.value.action.score = +data.value.action.die + +adds.value + +attribute.value;
      if (data.value.action.score > 10) data.value.action.score = 10; // Action score can't be higher than 10

      // Account for negative momentum
      if (
        campaign.data.character.tracks.momentum.value < 0 &&
        Math.abs(campaign.data.character.tracks.momentum.value) === Math.abs(data.value.action.die)
      ) {
        data.value.action.score -= data.value.action.die;
      }

      data.value.challenge.match = data.value.challenge.die1.roll === data.value.challenge.die2.roll;

      data.value = updateResults(data.value);
    };

    const saveResult = () => {
      if (!data.value.result) return;

      campaign.appendToJournal(
        0,
        `<div class="note actionroll"><b>[${data.value.result}: ${data.value.action.die} + ${attribute.value} + ${adds.value} = ${data.value.action.score} vs ${data.value.challenge.die1.roll} | ${data.value.challenge.die2.roll}]</b>&nbsp;</div>`
      );
    };

    const mInc = () => {
      if (campaign.data.character.tracks.momentum.value < campaign.data.character.tracks.momentum.max)
        campaign.data.character.tracks.momentum.value++;
    };

    const mDec = () => {
      if (campaign.data.character.tracks.momentum.value > campaign.data.character.tracks.momentum.min)
        campaign.data.character.tracks.momentum.value--;
    };

    return {
      show,
      close,
      campaign,
      icon,

      attribute,
      otherAttr,
      select,
      adds,
      opts,

      roll,
      reroll,
      burn,
      burnt,
      data,
      mInc,
      mDec,

      adIcon,

      d100,
      d100Res,

      d6,
      d6Res,

      saveResult,
      clear,
    };
  },
});
</script>
