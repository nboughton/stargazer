<template>
  <div>
    <q-expansion-item
      :icon="`img:${icon.creature(data.form)}`"
      header-class="creature-header rounded-borders q-mb-sm"
      :label="data.name"
      :caption="$t('enums.sectorItem.Creature')"
    >
      <controls v-if="controls" @move="$emit('move', $event)" />
      <div class="row q-gutter-sm q-mb-sm no-wrap">
        <i-input class="col" :label="$t('common.name')" v-model="data.name" />
        <i-input class="col" :label="$t('oracles.fields.scale')" v-model="data.scale" />
        <q-select
          class="col"
          :label="$t('oracles.fields.environment')"
          v-model="data.environment"
          :options="envOpts"
          map-options
          emit-value
          standout="bg-blue-grey text-white"
          :input-style="{ color: '#ECEFF4' }"
          dense
        />
        <q-btn class="col-shrink" v-if="config.data.edit" icon="delete" flat dense @click="$emit('delete')" />
      </div>

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" :label="$t('oracles.fields.form')" v-model="data.form" />
        <i-input class="col" :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" :label="$t('oracles.fields.form')" v-model="data.form" />
        <i-input class="q-mb-sm" :label="$t('oracles.fields.firstLook')" v-model="data.firstLook" />
      </div>

      <div class="row q-gutter-sm q-mb-sm" v-if="$q.screen.gt.xs">
        <i-input class="col" :label="$t('oracles.fields.observedBehaviour')" v-model="data.behaviour" />
        <i-input class="col" :label="$t('oracles.fields.revealedAspect')" v-model="data.aspect" />
      </div>
      <div v-else>
        <i-input class="q-mb-sm" :label="$t('oracles.fields.observedBehaviour')" v-model="data.behaviour" />
        <i-input class="q-mb-sm" :label="$t('oracles.fields.revealedAspect')" v-model="data.aspect" />
      </div>

      <i-input class="q-mb-sm" :label="$t('common.notes')" v-model="data.notes" autogrow />
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';

import { ICreature, EEnv } from '../models';

import { useConfig } from 'src/store/config';

import { icon } from 'src/lib/icons';
import { enumOptions } from 'src/i18n';

import IInput from '../Widgets/IInput.vue';
import Controls from './Controls.vue';

export default defineComponent({
  components: { IInput, Controls },
  name: 'SCreature',
  props: {
    modelValue: {
      type: Object as PropType<ICreature>,
      required: true,
    },
    controls: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'delete', 'move'],
  setup(props, { emit }) {
    const data = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );
    watch(
      () => data.value,
      () => emit('update:modelValue', data.value),
      { deep: true }
    );

    const config = useConfig();
    const envOpts = computed(() => enumOptions(Object.values(EEnv), 'enums.env'));

    return {
      data,
      config,
      EEnv,
      envOpts,
      icon,
    };
  },
});
</script>

<style lang="sass">
.creature-header
  background-color: $creature
  text-shadow: 1px 1px 1px $dark-page
</style>
