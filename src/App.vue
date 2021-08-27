<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useConfig } from './store/config'
import { useCampaign } from './store/campaign'
import { useQuasar } from 'quasar'
import { useAssets } from './store/assets'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    $q.dark.set(true)

    const campaign = useCampaign()
    campaign.populateStore().catch((err) => console.log(err))

    const assets = useAssets()
    assets.populateStore().catch(err => console.log(err))

    const config = useConfig()

    watch(
      () => config.$state,
      async () => {
        await config.save()
      },
      { deep: true }
    )

    watch(
      () => config.$state.data.current,
      async () => {
        await campaign.load(config.data.current)
      }
    )

    watch(
      () => campaign.$state,
      async () => {
        await campaign.save()
      },
      { deep: true }
    )
  }
})
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
</style>