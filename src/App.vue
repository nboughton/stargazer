<template>
  <router-view v-if="loaded" />
  <div v-else>
    <div class="column q-pa-md text-h5 self-center text-positive" style="height: 100% width: 100%">
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
    const msg = ref(<string[]>['::booting system::']);

    const $q = useQuasar();
    $q.dark.set(true);

    const campaign = useCampaign();
    onMounted(async () => {
      await sleep(500);
      msg.value.push('::loading data::');
      await campaign.populateStore().catch((err) => console.log(err));
      await sleep(500);

      msg.value.push('::loading assets::');
      const assets = useAssets();
      await assets.populateStore().catch((err) => console.log(err));
      await sleep(500);

      msg.value.push('::welcome ' + campaign.data.character.name + '::');
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
</style>
