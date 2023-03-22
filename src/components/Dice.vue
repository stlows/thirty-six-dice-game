<script setup lang="ts">
import type DiceModel from "@/models/DiceModel";

const props = defineProps<{
  dice: DiceModel;
  mallusRound: boolean;
}>();
function toggleHold() {
  if (props.mallusRound) {
    return;
  }
  props.dice.toggleHold();
}
</script>

<template>
  <div
    class="dice"
    @click="toggleHold"
    :disabled="mallusRound"
    :class="{ hold: dice.holded, holdedTemp: dice.holdedTemp }"
  >
    {{ dice.value }}
  </div>
</template>

<style>
.dice {
  width: 80px;
  height: 80px;
  border: 5px solid #b8dbd9;
  line-height: 60px;
  text-align: center;
  font-size: 50px;
  border-radius: 10px;
  cursor: pointer;
}
.dice.hold {
  border-color: #e5bb3d;
  color: #e5bb3d;
  cursor: no-drop;
}
.dice.holdedTemp {
  border-color: #3de575;
  color: #3de575;
}
</style>
