<template>
  <q-page padding>
    <!-- content -->
    <truth label="Cataclysm" id="cataclysm" />
    <truth label="Exodus" id="exodus" />
    <truth label="Communities" id="communities" />
    <truth label="Iron" id="iron" />
    <truth label="Laws" id="laws" />
    <truth label="Religion" id="religion" />
    <truth label="Magic" id="magic" />
    <truth label="Communication and Data" id="communication" />
    <truth label="Medicine" id="medicine" />
    <truth label="Artificial Intelligence" id="ai" />
    <truth label="War" id="war" />
    <truth label="Lifeforms" id="lifeforms" />
    <truth label="Precursors" id="precursors" />
    <truth label="Horrors" id="horrors" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Truth from 'src/components/Truth.vue';

export default defineComponent({
  name: 'Truths',
  components: { Truth },
});
</script>
