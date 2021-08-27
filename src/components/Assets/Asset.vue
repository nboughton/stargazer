<template>
  <q-card class="my-card asset-card column">
    <q-card-section class="text-bold bg-secondary">
      <div class="row items-center">
        <slot name="prepend" class="col-shrink" />
        <div class="col-grow">{{ data.title }}</div>
        <div class="col-shrink">{{ data.type }}</div>
        <slot name="append" class="col-shrink" />
      </div>
    </q-card-section>

    <q-card-section class="col justify-evenly">
      <div class="q-pb-sm" v-if="data.subtitle" v-html="data.subtitle" />

      <div v-if="data.input" class="q-pb-sm col">
        <q-input
          :label="data.input.label"
          v-model="data.input.text"
          :disable="browse"
          dense
          debounce="750"
        />
      </div>

      <div
        v-for="(item, index) in data.items"
        :key="index"
        class="row items-start q-pb-sm"
      >
        <q-checkbox
          v-model="data.items[index].marked"
          dense
          class="col-1"
          :disable="browse"
        />
        <div class="col-11" v-html="item.text" />
        <div class="col-1" />
        <q-input
          class="col-11 self-end"
          v-if="item.input"
          :label="item.input.label"
          :disable="browse"
          dense
          debounce="750"
          v-model="data.items[index].input.text"
        />
      </div>
    </q-card-section>

    <q-card-section class="row full-width">
      <resource-track
        class="col-grow"
        v-if="data.track"
        v-model="data.track"
        reverse
      />
    </q-card-section>

    <q-separator v-if="browse" />
    <q-card-actions v-if="browse" class="col-grow items-end justify-center">
      <div class="row">
        <q-btn
          label="Add to character"
          flat
          dense
          class="col-shrink"
          @click="addToCharacter"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';
import { IAsset } from 'src/components/models';
import { useCampaign } from 'src/store/campaign';
import ResourceTrack from 'src/components/Tracks/ResourceTrack.vue';

export default defineComponent({
  name: 'Asset',
  components: { ResourceTrack },
  props: {
    modelValue: {
      type: Object as PropType<IAsset>,
      required: true,
    },
    browse: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const data = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => (data.value = props.modelValue),
      { deep: true }
    );
    const campaign = useCampaign();

    const addToCharacter = () => {
      const dataCopy = JSON.parse(JSON.stringify(data.value)) as IAsset;
      campaign.data.character.assets.push(dataCopy);
    };

    return {
      data,
      addToCharacter,
    };
  },
});
</script>
