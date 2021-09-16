<template>
  <router-view v-if="loaded" />
  <q-dialog v-model="showLoading" maximized transition-hide="fade">
    <div class="column items-center text-center justify-center sf-header text-h1 text-positive">
      {{ dots }}
    </div>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, watch, onBeforeMount, ref } from 'vue';
import { useConfig } from './store/config';
import { useCampaign } from './store/campaign';
import { useQuasar } from 'quasar';
import { useAssets } from './store/assets';
import { sleep } from './lib/util';

export default defineComponent({
  name: 'App',
  setup() {
    const loaded = ref(false);
    const showLoading = ref(true);
    const dots = ref('.');

    const $q = useQuasar();
    $q.dark.set(true);

    const campaign = useCampaign();
    onBeforeMount(async () => {
      await sleep(500);
      dots.value = '..';
      await campaign.populateStore().catch((err) => console.log(err));
      await sleep(500);

      dots.value = '...';
      const assets = useAssets();
      await assets.populateStore().catch((err) => console.log(err));
      await sleep(500);

      dots.value = '....';
      await sleep(500);
      loaded.value = true;
      showLoading.value = false;
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
      showLoading,
      dots,
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
