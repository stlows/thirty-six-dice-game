<script setup lang="ts">
import type PlayerModel from "@/models/PlayerModel";
import { ref } from "vue"

const props = defineProps<{ player: PlayerModel }>();

const newName = ref("")
const isEditing = ref(false)

const editName = () => {
  newName.value = props.player.name
  isEditing.value = true
}
const setName = () => {
  isEditing.value = false
  props.player.name = newName.value
  newName.value = ""
}
</script>

<template>
  <div class="player" :class="{ active: player.isActive, dead: !player.alive }">
    <div v-if="!isEditing">
      <h2>{{ player.name }}</h2>
      <h3 class="points">{{ player.point }} points</h3>
      <button class="editBtn" @click="editName">✏️</button>
    </div>
    <div class="flex" v-else>
      <div>
        <input type="text" v-model="newName" autofocus>
        <h3 class="points">{{ player.point }} points</h3>
      </div>
      <button class="editBtn" @click="setName">✅</button>
    </div>
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
  position: relative;
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
.flex {
  display: flex;
}
.player button.editBtn {
  position: absolute;
  top:-10px;
  right:-10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5em;
  border-radius: 50%;
}
.player button.editBtn:hover{
  background-color: rgba(0,0,0,0.1);
}
.player input {
  border: 2px solid white;
  background-color: transparent;
  border-radius: 5px;
  padding: 0.2em;
  color: white;
  font-size: 1.5em;
  width: 90%;
}
</style>
