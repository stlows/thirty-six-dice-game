<script setup lang="ts">
import type PlayerModel from "@/models/PlayerModel";

defineProps<{ player: PlayerModel }>();
</script>

<template>
  <div class="player" :class="{ active: player.isActive, dead: !player.alive }">
    <h2>{{ player.name }}</h2>
    <h3 class="points">{{ player.point }} points</h3>
  </div>
</template>

<style>
.player {
  padding: 1em 2em;
  border: 5px solid #1b926bd2;
  border-radius: 20px;
  width: 300px;
  background-color: #04724d;
  color: white;
}
.player.active {
  border-color: white;
}
.player.dead {
  opacity: 0.2;
}
h2 {
  margin-bottom: 0;
}
.points {
  font-size: 0.9em;
}
</style>
