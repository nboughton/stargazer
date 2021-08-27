<template>
  <q-dialog v-model="show" position="bottom" transition-show="slide-up" transition-hide="slide-down" seamless class="roller">
    <q-card class="column my-card">
      <q-card-section class="row items-center">
        <div class="col-12 text-h6 q-px-sm" v-if="d100Res > 0">
          <div class="row items-center justify-between">
            <div class="col-shrink" />
            <div class="col-grow text-center q-mb-sm">{{ d100Res }}</div>
            <q-btn class="col-shrink" dense flat icon="mdi-backspace-outline" @click="d100Res = 0" :size="btnSize" />
          </div>
        </div>

        <div v-if="data.result" class="col-12 text-h6">
          <div class="row text-center items-center justify-center">
            <div :class="data.action.color">{{ data.result }}
              <span v-if="data.challenge.match">with a match</span>
              <q-icon v-if="burnt" name="mdi-fire" /></div>
          </div>
          <div class="row items-center justify-between q-mx-sm">
            <q-icon v-if="!burnt" :name="adIcon" size="md"/>
            <span v-if="!burnt">+</span>
            <span v-if="!burnt">{{ attribute }}</span>
            <span v-if="!burnt">+</span>
            <span v-if="!burnt">{{ adds }}</span>
            <span v-if="!burnt">=</span>
            <span v-if="burnt">Momentum</span>
            <span v-if="burnt">=</span>
            <span :class="data.action.color">{{ data.action.score }}</span><span>vs</span>
            <span :class="data.challenge.die1.color">{{ data.challenge.die1.roll }}</span><span>|</span>
            <span :class="data.challenge.die2.color">{{ data.challenge.die2.roll }}</span>
            <q-btn class="col-shrink" dense flat icon="mdi-backspace-outline" @click="data.result = ''" :size="btnSize">
              <q-tooltip>Clear Roll Results</q-tooltip>
            </q-btn>
          </div>
        </div>

        <div class="col-12">
          <div class="row items-baseline justify-between">
            <q-btn-toggle class="col-grow" :options="opts" label="Attribute" dense flat spread v-model="select" :size="btnSize" />
            <q-input class="col-1" type="number" label="Other" dense borderless hide-bottom-space v-model="otherAttr">
              <q-tooltip>Custom attribute value</q-tooltip>
            </q-input>
            <q-input class="col-1" type="number" label="Adds" dense borderless hide-bottom-space v-model="adds" />
          </div>

          <div class="row items-baseline justify-evenly">
            <q-btn class="col-shrink" icon="expand_more" dense flat @click="close" :size="btnSize">
              <q-tooltip>Hide roller</q-tooltip>
            </q-btn>
            <q-btn class="col-shrink" dense icon="mdi-dice-6" flat @click="roll" :size="btnSize">
              <q-tooltip>Roll +Attribute</q-tooltip>
            </q-btn>
            <q-btn class="col-shrink" dense flat :label="campaign.data.character.tracks.momentum.value" icon="mdi-fire" @click="burn" :size="btnSize">
              <q-tooltip>Burn Momentum</q-tooltip>
            </q-btn>
            <q-btn class="col-shrink" dense flat icon="mdi-percent" @click="d100" :size="btnSize">
              <q-tooltip>Roll a D100</q-tooltip>
            </q-btn>

          </div>
        </div>

      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useCampaign } from 'src/store/campaign'
import { defineComponent, computed, ref, watch } from 'vue'
import { ISelectOpt } from './models'
import { d, moveRoll, NewRollData, updateResults } from 'src/lib/roll'

export default defineComponent({
  name: 'Roller',
  props: {
    modelValue: {
      type: Boolean
    },
    btnSize: {
      type: String,
      default: 'md'
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const show = ref(props.modelValue)
    watch(() => props.modelValue,
      () => (show.value = props.modelValue))
    const close = () => {
      clear()
      show.value = false
      ctx.emit('update:modelValue', show.value)
    }
    const clear = () => {
      d100Res.value = 0
      data.value.result = ''
      adds.value = 0
      otherAttr.value = 0
      burnt.value = false
    }

    const campaign = useCampaign()
    const attribute = ref(0)
    const otherAttr = ref(0)

    const adds = ref(0)
    const opts = computed((): ISelectOpt[] => {
      return [
        { label: 'Edge', value: `edge:${campaign.data.character.stats.edge}` },
        { label: 'Heart', value: `heart:${campaign.data.character.stats.heart}` },
        { label: 'Iron', value: `iron:${campaign.data.character.stats.iron}` },
        { label: 'Shadow', value: `shadow:${campaign.data.character.stats.shadow}` },
        { label: 'Wits', value: `wits:${campaign.data.character.stats.wits}` },
        { label: 'Other', value: 'other' }
      ]
    })

    const select = ref('')
    watch(() => select.value,
      () => {
        clear()
        if (select.value.includes(':')) {
          const n = select.value.split(':')[1]
          attribute.value = +n
        }
      })

    const data = ref(NewRollData())
    const roll = () => {
      burnt.value = false
      if (select.value === 'other') attribute.value = otherAttr.value
      data.value = moveRoll(attribute.value, adds.value, campaign.data.character.tracks.momentum.value, false)
    }

    const burnt = ref(false)
    const burn = () => {
      const m = campaign.data.character.tracks.momentum.value
      const r = campaign.data.character.tracks.momentum.reset
      if (data.value.result && data.value.result !== 'Strong Hit' && data.value.action.score < m) {
        data.value.action.score = m
        campaign.data.character.tracks.momentum.value = r
        data.value = updateResults(data.value)
        burnt.value = true
      }
    }

    const adIcon = computed(() => {
      const m = campaign.data.character.tracks.momentum.value
      return m < 0 && Math.abs(m) === data.value.action.die
        ? `mdi-dice-${data.value.action.die}-outline`
        : `mdi-dice-${data.value.action.die}`
    })

    const d100Res = ref(0)
    const d100 = () => (d100Res.value = d(100))

    return {
      show,
      close,
      campaign,

      attribute,
      otherAttr,
      select,
      adds,
      opts,

      roll,
      burn,
      burnt,
      data,

      adIcon,

      d100,
      d100Res,

      clear
    }
  }
})
</script>
