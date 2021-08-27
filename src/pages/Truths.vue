<template>
  <q-page padding>
    <!-- content -->
    <truth v-model="campaign.data.truths.theOldWorld" label="The Old World" id="theOldWorld" />
    <truth v-model="campaign.data.truths.iron" label="Iron" id="iron" />
    <truth v-model="campaign.data.truths.legacies" label="Legacies" id="legacies" />
    <truth v-model="campaign.data.truths.communities" label="Communities" id="communities" />
    <truth v-model="campaign.data.truths.leaders" label="Leaders" id="leaders" />
    <truth v-model="campaign.data.truths.defense" label="Defense" id="defense" />
    <truth v-model="campaign.data.truths.mysticism" label="Mysticism" id="mysticism" />
    <truth v-model="campaign.data.truths.religion" label="Religion" id="religion" />
    <truth v-model="campaign.data.truths.firstBorn" label="Firstborn" id="firstBorn" />
    <truth v-model="campaign.data.truths.beasts" label="Beasts" id="beasts" />
    <truth v-model="campaign.data.truths.horrors" label="Horrors" id="horrors" />
  </q-page>
</template>

<script lang="ts">
import { useCampaign } from 'src/store/campaign'
import { defineComponent } from 'vue'
import Truth from 'src/components/Truth.vue'
export default defineComponent({
  name: 'Truths',
  components: { Truth },
  setup() {
    const campaign = useCampaign()

    return {
      campaign
    }
  }
})
</script>
