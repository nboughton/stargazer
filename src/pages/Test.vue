<template>
  <q-page padding>
    <div class="row">
      <clock v-model="item" />
    </div>
    {{ item }}
  </q-page>
</template>

<script lang="ts">
import { IClock } from 'src/components/models';
import Clock from 'src/components/Tracks/Clock.vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: { Clock },
  // name: 'PageName'
  setup() {
    const item = ref(<IClock>{
      name: '',
      segments: 4,
      filled: 0,
    });

    return {
      item,
    };
  },
});
</script>
