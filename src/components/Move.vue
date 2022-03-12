<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden"
    :label="move.name"
    :caption="caption"
    :header-class="cardStyle"
    style="border-radius: 4px"
  >
    <q-card class="card-bg">
      <q-card-section v-html="move.text" />
      <q-card-section v-if="move.oracles" class="q-gutter-md">
        <q-btn
          v-for="(table, index) in move.oracles"
          :key="index"
          :label="'Roll ' + table"
          @click="click(table)"
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
import { IMove } from 'src/components/models';
import { Move } from 'src/lib/oracles/move';
import { tableRoll } from 'src/lib/roll';
import { useCampaign } from 'src/store/campaign';

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
      if (props.move.oracles !== undefined) {
        try {
          results.value.push(tableRoll(Move[o]));
        } catch (err) {
          alert('Move data not found');
        }
      }
    };
    const cardStyle = computed((): string => {
      return 'text-h6 move-header ' + props.moveType.split(' ')[0].toLowerCase();
    });
    const caption = computed((): string => {
      return `${props.moveType}: ${props.move.source}`;
    });
    const save = () => {
      const campaign = useCampaign();
      results.value.forEach((v) => {
        campaign.appendToJournal(0, `<div class="note moveoracleroll"><b>[${props.move.name}: ${v}]</b></div>`);
      });
    };
    return {
      click,
      results,
      save,
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
