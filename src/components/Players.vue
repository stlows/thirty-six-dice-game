<script setup lang="ts">
import type PlayerModel from "@/models/PlayerModel";
import Player from "@/components/Player.vue";
defineProps<{
  players: Array<PlayerModel>;
}>();
</script>

<template>
  <div>
    <h1 class="green">Players</h1>
    <div v-for="player in players" class="mb-6">
      <Player :player="player" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
