<template>
  <router-view v-if="loaded" />
  <div v-else>
    <div class="column q-pa-xl text-h5 self-center text-positive" style="height: 100% width: 100%">
      <div class="sf-header" v-for="(line, i) in msg" :key="i">
        {{ line }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue';
import { useConfig } from './store/config';
import { useCampaign } from './store/campaign';
import { useQuasar } from 'quasar';
import { useAssets } from './store/assets';
import { sleep } from './lib/util';

export default defineComponent({
  name: 'App',
  setup() {
    const loaded = ref(false);
    const msg = ref(<string[]>['']);

    const writeLine = async (text: string) => {
      msg.value.push('');
      for (let i = 0; i < text.length; i++) {
        await sleep(40);
        msg.value[msg.value.length - 1] += text.charAt(i);
      }
    };

    const $q = useQuasar();
    $q.dark.set(true);

    const campaign = useCampaign();
    onMounted(async () => {
      await writeLine('::booting system...');
      await sleep(500);
      await writeLine('::assessing damage...');
      await campaign.populateStore().catch((err) => console.log(err));
      await sleep(500);

      await writeLine('::loading protocols...');
      const assets = useAssets();
      await assets.populateStore().catch((err) => console.log(err));
      await sleep(500);

      await writeLine('::welcome ' + campaign.data.character.name);
      await sleep(500);
      loaded.value = true;
    });

    const config = useConfig();

    watch(
      () => config.$state,
      async () => {
        await config.save();
      },
      { deep: true }
    );

    watch(
      () => config.$state.data.current,
      async () => {
        await campaign.load(config.data.current);
      }
    );

    watch(
      () => campaign.$state,
      async () => {
        await campaign.save();
      },
      { deep: true }
    );

    return {
      loaded,
      msg,
    };
  },
});
</script>

<style lang="sass">
.my-card
  background: $bg-card

.asset-bg
  background-color: $dark-page

.asset-card
  width: 350px

.field
  background: $field

p
  margin-bottom: 5px
  padding-bottom: 0px

.asset-text > ul
  padding: 5px
  margin: 0
  list-style-type: none
</style>
