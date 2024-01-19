<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden"
    :label="move.Name"
    :caption="caption"
    :header-class="cardStyle"
    style="border-radius: 4px"
  >
    <q-card class="card-bg">
      <q-card-section v-html="mdToHtml(move.Text)" />
      <q-card-section v-if="move.Oracles" class="q-gutter-md">
        <q-btn
          v-for="(oracleID, index) in move.Oracles"
          :key="index"
          :label="'Roll ' + oracleID.split('/').splice(-1)[0].replace(/_/g, ' ')"
          @click="click(oracleID)"
          outline
        />
        <q-btn label="Clear results" outline @click="results = []" />
        <q-btn icon="save" outline @click="save" />
        <div>
          <span v-for="(res, index) in results" :key="index" class="q-pr-md" v-html="res"></span>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';

import { IMove } from 'dataforged';

import { useCampaign } from 'src/store/campaign';

import { mdToHtml } from 'src/lib/util';

import * as oracle from 'src/lib/oracles';

export default defineComponent({
  name: 'Move',
  props: {
    move: {
      type: Object as PropType<IMove>,
      required: true,
    },
    moveType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const results = ref([] as string[]);

    const click = (o: string) => {
      if (props.move.Oracles !== undefined) {
        try {
          results.value.push(oracle.roll(o));
        } catch (err) {
          alert('Move data not found');
        }
      }
    };

    const cardStyle = computed((): string => {
      return 'text-h6 move-header ' + props.moveType.split(' ')[0].toLowerCase();
    });

    const caption = computed((): string => {
      return `${props.moveType}: ${props.move.Source.Title} (pg. ${
        props.move.Source.Page ? props.move.Source.Page : '?'
      })`;
    });

    const save = () => {
      const campaign = useCampaign();
      results.value.forEach((v) => {
        campaign.appendToJournal(0, `<div class="note moveoracleroll"><b>[${props.move.Name}: ${v}]</b></div>`);
      });
    };

    return {
      click,
      results,
      save,
      mdToHtml,
      cardStyle,
      caption,
    };
  },
});
</script>

<style lang="sass">
ul
  margin: 0em
  padding: 1.5em

ul li
  margin: 0
  padding: 0

.move-header
  text-shadow: 1px 1px 1px #4C566A

.session
  background-color: $session

.legacy
  background-color: $legacy

.adventure
  background-color: $adventure

.combat
  background-color: $combat

.fate
  background-color: $fate

.quest
  background-color: $quest

.connection
  background-color: $connection

.suffer
  background-color: $suffer

.exploration
  background-color: $exploration

.threshold
 background-color: $threshold

.recover
 background-color: $recover

.scene
  background-color: $scene
</style>
