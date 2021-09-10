<template>
  <div
    class="row justify-center q-pa-none q-ma-none"
    :style="{ background: colour }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <q-btn class="cell-icon self-center" size="sm" :icon="cellIcon" flat />
  </div>
</template>

<script lang="ts">
import { useCampaign } from 'src/store/campaign';
import { defineComponent, PropType, computed, ref } from 'vue';
import { IHex } from '../models';
import { icon } from 'src/lib/icons';
export default defineComponent({
  name: 'HexCell',
  props: {
    cellData: {
      type: Object as PropType<IHex>,
      required: true,
    },
  },
  setup(props) {
    const campaign = useCampaign();

    const hover = ref(false);
    const colour = computed((): string => {
      if (hover.value) return 'lightgrey';
      if (props.cellData.player) return 'green';
      if (props.cellData.id !== '') {
        const c = campaign.getCell(props.cellData.id);
        let bgk = 'linear-gradient(to bottom right, #3b4252';
        if (c.stars.length > 0) bgk += ', #6d72a4ff';
        if (c.planets.length > 0) bgk += ', #7368b0ff';
        if (c.settlements.length > 0) bgk += ', #9d5a9fff';
        if (c.ships.length > 0) bgk += ', #ad6398ff';
        if (c.npcs.length > 0) bgk += ', #9e708fff';
        if (c.creatures.length > 0) bgk += ', #3c8ab5ff';
        if (c.derelicts.length > 0) bgk += ', #427a99ff';
        if (c.vaults.length > 0) bgk += ', #427074ff';
        bgk += ' 100%)';
        return bgk;
      }
      return props.cellData.isPassage ? 'lightblue' : 'white';
    });

    const cellIcon = computed((): string => {
      let i = '';
      if (props.cellData.id) {
        i = 'img:icons/space/stars.svg';
        const c = campaign.getCell(props.cellData.id);
        if (c.npcs.length > 0) i = icon.npc();
        if (c.creatures.length > 0) i = icon.creature(c.creatures[0].form);
        if (c.vaults.length > 0) i = icon.vault();
        if (c.derelicts.length > 0) i = icon.derelict();
        if (c.ships.length > 0) i = icon.starship();
        if (c.settlements.length > 0) i = icon.settlement();
        if (c.planets.length > 0) i = icon.planet(c.planets[0].type);
        if (c.stars.length > 0) i = icon.star();
      }
      return i;
    });

    return {
      hover,
      colour,
      cellIcon,
    };
  },
});
</script>

<style scoped>
.cell-icon {
  margin-top: 5px;
  margin-left: -9px;
}
</style>
