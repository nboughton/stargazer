<template>
  <q-page padding>
    <!-- content -->
    <div class="text-h4 text-center">Locations<q-btn icon="add_circle" @click="addLocation" flat  dense/></div>
    <q-input label="Search by name or description" v-model="filter" clearable class="q-pb-md" standout="bg-blue-grey text-white" :input-style="{ color: '#ECEFF4' }" dense debounce="500">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div v-for="(loc, index) in campaign.data.locations" :key="index">
      <div v-if="showLocation(loc)" class="row q-pa-sm q-mb-md rounded-borders my-card">
        <q-input class="col-grow" label="Name" v-model="campaign.data.locations[index].name" debounce="750" dense>
          <template v-slot:append v-if="$q.screen.lt.sm && config.data.edit">
            <q-btn class="col-shrink" icon="delete" flat dense @click="removeLocation(index)" />
          </template>
        </q-input>

        <q-input class="col-grow" label="Region" v-model="campaign.data.locations[index].region" debounce="750" dense>
          <template v-slot:append v-if="$q.screen.gt.xs && config.data.edit">
            <q-btn class="col-shrink" icon="delete" flat dense @click="removeLocation(index)" />
          </template>
        </q-input>

        <q-input class="col-12" label="Description" v-model="campaign.data.locations[index].description" debounce="750" dense autogrow />
        <q-input class="col-12" label="Trouble" v-model="campaign.data.locations[index].trouble" debounce="750" dense autogrow />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { NewLocation } from 'src/lib/campaign'
import { useCampaign } from 'src/store/campaign'
import { ILocation } from 'src/components/models'
import { defineComponent, ref } from 'vue'
import { useConfig } from 'src/store/config'
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'Locations',
  setup() {
    const campaign = useCampaign()
    const filter = ref('')

    const addLocation = () => campaign.data.locations.unshift(NewLocation())
    const removeLocation = (index: number) => campaign.data.locations.splice(index, 1)
    const showLocation = (loc: ILocation): boolean => {
      if (filter.value === '' || filter.value === null) {
        return true
      }

      if (loc.name !== undefined) {
        if (RegExp(filter.value, 'i').test(loc.name)) {
          return true
        }
      }

      if (loc.description !== undefined) {
        if (RegExp(filter.value, 'i').test(loc.description)) {
          return true
        }
      }

      return false
    }

    const config = useConfig()
    const $q = useQuasar()

    return {
      campaign,
      addLocation,
      removeLocation,
      showLocation,
      filter,
      config,
      $q
    }
  }
})
</script>
