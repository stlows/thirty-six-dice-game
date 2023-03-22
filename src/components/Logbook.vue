<script setup lang="ts">
const props = defineProps<{ logs: Array<string> }>();
</script>

<template>
  <div class="logs">
    <h1>Game Log</h1>
    <div v-for="log in logs" class="log">
      {{ log }}
    </div>
  </div>
</template>

<style scoped>
.logs {
  height: 200px;
  border: 3px solid #b8dbd9;
  border-radius: 10px;
  padding: 1em;
  overflow-y: auto;
  max-width: 400px;
}

h1 {
  font-weight: bold;
}
</style>
