<template>
  <div class="q-pa-sm my-card rounded-borders">
    <div class="row" v-if="showName">
      <q-input class="col-grow" name="Name" dense standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" autogrow v-model="data.name" debounce="750" @update:modelValue="updateValue">
        <template v-slot:append>
          <slot name="action" class="col-shrink"/>
        </template>
      </q-input>
    </div>

    <div v-if="rollData.result" class="col-12 text-h6">
      <div class="row text-center items-center justify-evenly">
        <div :class="rollData.action.color">{{ rollData.result }} <span v-if="rollData.challenge.match">with a match</span>:</div>
        <span :class="rollData.action.color">{{ rollData.action.score }}</span><span>vs</span>
        <span :class="rollData.challenge.die1.color">{{ rollData.challenge.die1.roll }}</span><span>|</span>
        <span :class="rollData.challenge.die2.color">{{ rollData.challenge.die2.roll }}</span>
        <q-btn icon="mdi-close-circle" flat dense :size="btnSize" @click="rollData.result = ''">
          <q-tooltip>Clear roll result</q-tooltip>
        </q-btn>
      </div>
    </div>

    <div class="row justify-evenly">
      <q-btn label="Mark" dense :size="btnSize" flat @click="mark" />
      <q-btn v-for="(value, index) in data.boxes" :key="index" flat dense :size="btnSize" :icon="boxIcon(value)" @click="boxIncrement(index)" />
      <q-btn icon="mdi-dice-6" flat dense :size="btnSize" @click="conclude">
        <q-tooltip>Make a progress roll</q-tooltip>
      </q-btn>
    </div>

    <div class="row justify-center items-center" v-if="showDifficulty">
      <q-btn-toggle dense flat :size="btnSize" v-model="data.difficulty" :options="diffOpts" @update:modelValue="updateValue"/>
      <q-btn v-if="showMenaceBtn" :icon="menaceIcon" flat dense :size="btnSize" @click="menaceToggle">
        <q-tooltip>Toggle Menace Track</q-tooltip>
      </q-btn>
    </div>

    <div class="row justify-evenly" v-if="data.showMenace && data.menace !== undefined">
      <q-input class="col-12 q-pb-sm" label="Menace" dense autogrow standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" v-model="data.menace.name" />
      <q-checkbox v-for="(box, index) in data.menace.boxes" :key="index" dense :size="btnSize" v-model="data.menace.boxes[index]" color="negative" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { IProgressTrack } from 'src/components/models'
import { Difficulty, NewMenace } from 'src/lib/campaign'
import { sleep } from 'src/lib/util'
import { useQuasar } from 'quasar'
import { moveRoll, NewRollData } from 'src/lib/roll'

export default defineComponent({
  name: 'ProgressTrack',
  props: {
    modelValue: {
      type: Object as PropType<IProgressTrack>,
      required: true
    },
    showName: {
      type: Boolean,
      default: true
    },
    showDifficulty: {
      type: Boolean,
      default: true
    },
    showMenaceBtn: {
      type: Boolean,
      default: true
    },
    setDifficulty: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  setup (props, ctx) {
    const data = ref(props.modelValue)
    watch(() => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true })

    const updateValue = () => ctx.emit('update:modelValue', data.value)

    // Set difficulty externally
    if (props.setDifficulty !== 0) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      data.value.difficulty = props.setDifficulty
    }

    const boxIncrement = (index: number) => {
      if (data.value.boxes[index] === 4) {
        data.value.boxes[index] = 0
      } else {
        data.value.boxes[index]++
      }
      updateValue()
    }
    const boxIcon = (value: number): string => {
      switch (value) {
        case 0:
          return 'mdi-checkbox-blank-outline'
        case 1:
          return 'mdi-slash-forward'
        case 2:
          return 'mdi-close'
        case 3:
          return 'mdi-asterisk'
        case 4:
          return 'mdi-svg'
        default:
          break
      }

      return 'mdi-checkbox-blank-outline'
    }

    const diffOpts = [
      { label: Difficulty[1].label, value: 1 },
      { label: Difficulty[2].label, value: 2 },
      { label: Difficulty[3].label, value: 3 },
      { label: Difficulty[4].label, value: 4 },
      { label: Difficulty[5].label, value: 5 }
    ]

    const mark = () => {
      let ticks = Difficulty[data.value.difficulty].mark * 4

      void (async () => {
        for (let i = 0; i < data.value.boxes.length; i++) {
          while (data.value.boxes[i] < 4 && ticks > 0) {
            data.value.boxes[i]++
            ticks--
            await sleep(100)
          }
        }
        updateValue()
      })()
    }

    const $q = useQuasar()
    const btnSize = computed(() => {
      if ($q.screen.lt.sm) {
        return 'sm'
      }
      return 'md'
    })

    const menaceIcon = computed(() => {
      if (data.value.showMenace) {
        return 'mdi-alpha-m-box'
      }
      return 'mdi-alpha-m'
    })
    const menaceToggle = () => {
      if (data.value.menace === undefined) {
        data.value.menace = NewMenace()
      }
      data.value.showMenace = !data.value.showMenace
      updateValue()
    }

    const actionScore = computed((): number => {
      let n = 0
      data.value.boxes.forEach(b => {
        if (b === 4) {
          n++
        }
      })
      return n
    })
    const rollData = ref(NewRollData())
    const conclude = () => { rollData.value = moveRoll(0, 0, 0, true, actionScore.value) }

    return {
      data,
      boxIncrement,
      boxIcon,
      diffOpts,
      mark,
      updateValue,
      btnSize,

      menaceToggle,
      menaceIcon,

      conclude,
      rollData
    }
  }
})
</script>
