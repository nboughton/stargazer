<template>
  <q-page padding>
    <!-- content -->
    <div class="text-h4 text-center">NPCs<q-btn icon="add_circle" @click="addNPC" flat  dense/></div>
    <q-input label="Search by name or description" v-model="filter" clearable class="q-pb-md" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense debounce="500">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div v-for="(npc, index) in campaign.data.npcs" :key="index">
      <div v-if="showNPC(npc)" class="row q-pa-sm q-mb-md rounded-borders my-card">
        <q-input class="col-grow" label="Name" v-model="campaign.data.npcs[index].name" debounce="750" dense>
          <template v-slot:append>
            <q-btn v-if="config.data.edit" class="col-shrink" icon="delete" flat dense @click="removeNPC(index)" />
          </template>
        </q-input>
        <q-input class="col-12" label="Description" v-model="campaign.data.npcs[index].description" debounce="750" dense autogrow />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { NewNPC } from 'src/lib/campaign'
import { useCampaign } from 'src/store/campaign'
import { INPC } from 'src/components/models'
import { defineComponent, ref } from 'vue'
import { useConfig } from 'src/store/config'
export default defineComponent({
  name: 'NPCs',
  setup() {
    const campaign = useCampaign()
    const filter = ref('')

    const addNPC = () => campaign.data.npcs.unshift(NewNPC())
    const removeNPC = (index: number) => campaign.data.npcs.splice(index, 1)
    const showNPC = (npc: INPC): boolean => {
      if (filter.value === '' || filter.value === null) {
        return true
      }

      if (npc.name !== undefined) {
        if (RegExp(filter.value, 'i').test(npc.name)) {
          return true
        }
      }

      if (npc.description !== undefined) {
        if (RegExp(filter.value, 'i').test(npc.description)) {
          return true
        }
      }

      return false
    }

    const config = useConfig()

    return {
      campaign,
      addNPC,
      removeNPC,
      showNPC,
      filter,
      config
    }
  }
})
</script>
