<template>
  <div>
    <q-btn color="white" icon="" flat dense @click="myAlert" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IHex } from '../models';
export default defineComponent({
  name: 'HexCell',
  props: {
    cellData: {
      type: Object as PropType<IHex>,
    },
  },
  setup() {
    const myAlert = () => {
      alert('CLICK');
    };

    return {
      myAlert,
    };
  },
});
</script>
