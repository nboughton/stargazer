<template>
  <q-expansion-item class="shadow-1 overflow-hidden" :label="move.name" :caption="caption" :header-class="cardStyle" style="border-radius: 4px">
    <q-card class="my-card">
      <q-card-section v-html="move.text" />
      <q-card-section v-if="move.oracles" class="q-gutter-md">
        <q-btn v-for="(table, index) in move.oracles" :key="index" :label="'Roll '+table" @click="click(table)" outline />
        <q-btn label="Clear results" outline @click="results = []" />
        <div>
          <span v-for="(res, index) in results" :key="index" class="q-pr-md">{{ res }}</span>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { IMove } from 'src/components/models'
import { Move } from 'src/lib/oracles/move'
import { oracleRoll } from 'src/lib/roll'

export default defineComponent({
  name: 'Move',
  props: {
    move: {
      type: Object as PropType<IMove>,
      required: true
    },
    moveType: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const results = ref([] as string[])
    const click = (o: string) => {
      if (props.move.oracles !== undefined) {
        results.value.push(oracleRoll(Move[o]))
      }
    }
    const cardStyle = computed((): string => {
      return 'shadow-1 overflow-hidden text-h6 move-header ' + props.moveType.split(' ')[0].toLowerCase()
    })
    const caption = computed((): string => { return `${props.moveType}: ${props.move.source}` })
    return {
      click,
      results,
      cardStyle,
      caption
    }
  }
})
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

.adventure
  background-color: $adventure

.combat
  background-color: $combat

.fate
  background-color: $fate

.quest
  background-color: $quest

.relationship
  background-color: $relationship

.suffer
  background-color: $suffer

.delve
  background-color: $delve

.optional
  background-color: $delve
</style>
