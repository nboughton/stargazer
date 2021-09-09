<template>
  <q-layout view="hHh lpR fFf" container style="width: 820px; min-height: 400px">
    <q-page-container>
      <q-page>
        <div class="map">
          <div class="container">
            <hex-cell v-for="(o, i) in campaign.data.sectors[config.data.sector].hexes" :key="i" :cellData="o" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useCampaign } from 'src/store/campaign';
import { useConfig } from 'src/store/config';
import { defineComponent } from 'vue';
import HexCell from './HexCell.vue';

export default defineComponent({
  components: { HexCell },
  name: 'HexMap',
  setup() {
    const campaign = useCampaign();
    const config = useConfig();

    return {
      campaign,
      config,
    };
  },
});
</script>

<style lang="css" scoped>
.map {
  width: 800px;
  height: 330px;
  display: flex;
  --s: 30px; /* size  */
  --m: 1px; /* margin */
  --f: calc(1.732 * var(--s) + 4 * var(--m) - 1px);
}

.container {
  font-size: 0; /*disable white space between inline block element */
}

.container div {
  width: var(--s);
  margin: var(--m);
  height: calc(var(--s) * 1.1547);
  display: inline-block;
  font-size: initial;
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
  background: white;
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);
}
/*.container div:nth-child(odd) {
  background: green;
}*/
.container div:hover {
  background: grey;
}
.container::before {
  content: '';
  width: calc(var(--s) / 2 + var(--m));
  float: left;
  height: 120%;
  shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 3px), #000 0 var(--f));
}
</style>
