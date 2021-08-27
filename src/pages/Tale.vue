<template>
  <q-page padding>
    <!-- content -->
    <q-input label="Campaign Name" v-model="campaign.data.name" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" debounce="750" class="q-pb-md"/>
    <div v-for="(entry, index) in entries" :key="index" class="q-pb-md">
      <div class="text-h6">{{ entry.title }}</div>
      <q-input v-model="entry.content" disable autogrow borderless/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { IJournalEntry } from 'src/components/models'
import { useCampaign } from 'src/store/campaign'
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'Overview',
  setup() {
    const campaign = useCampaign()
    const entries = computed((): IJournalEntry[] => {
      const out = JSON.parse(JSON.stringify(campaign.data.journal)) as IJournalEntry[]
      return out.reverse()
    })

    return {
      campaign,
      entries
    }
  }
})
</script>
