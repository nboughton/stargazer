<template>
  <q-page padding>
    <!-- content -->
    <div class="text-h4 text-center">Sites<q-btn icon="add_circle" flat dense  @click="addSite" /></div>
     <q-input label="Search by name" v-model="filter" clearable class="q-pb-md" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense debounce="500">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div v-for="(site, index) in campaign.data.sites" :key="index">
      <site class="q-mb-md" v-if="showSite(site)" v-model="campaign.data.sites[index]" @deleteSite="removeSite(index)"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Site from 'src/components/Site.vue'
import { useCampaign } from 'src/store/campaign'
import { NewSite } from 'src/lib/campaign'
import { ISite } from 'src/components/models'

export default defineComponent({
  name: 'Sites',
  components: { Site },
  setup() {
    const filter = ref('')
    const campaign = useCampaign()
    const addSite = () => campaign.data.sites.unshift(NewSite())
    const removeSite = (index: number) => campaign.data.sites.splice(index, 1)
    const showSite = (site: ISite): boolean => {
      if (filter.value === '' || filter.value === null) {
        return true
      }

      if (site.name !== undefined) {
        if (RegExp(filter.value, 'i').test(site.name)) {
          return true
        }
      }

      return false
    }

    return {
      campaign,

      filter,
      addSite,
      removeSite,
      showSite
    }
  }
})
</script>
