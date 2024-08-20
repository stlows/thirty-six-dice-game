<script setup lang="ts">
import Dice from "@/components/Dice.vue";
import type DiceModel from "@/models/DiceModel";
import { computed, onMounted, ref } from "vue";
import { THRESHOLD, DICES_COUNT, ROLLS } from "../models/constants";

const props = defineProps<{
  dices: Array<DiceModel>;
  rollsLeft: number;
  mallusRound: boolean;
  mallusRoundValue: number;
}>();

const emit = defineEmits(["rolled", "endturn"]);

const message = ref("");
const holdedTempDices = computed(() => {
  return props.dices.filter((d) => d.holdedTemp);
});
const unholdedDices = computed(() => {
  return props.dices.filter((d) => !d.holded);
});

const cantRoll = computed(() => {
  return (
    props.rollsLeft === 0 ||
    (props.rollsLeft < ROLLS &&
      !props.mallusRound &&
      holdedTempDices.value.length === 0)
  );
});

function holdTempDices() {
  holdedTempDices.value.forEach((dice) => {
    dice.holded = true;
    dice.holdedTemp = false;
  });
}

function holdMallusDices() {
  const dicesToHold = props.dices.filter(
    (d) => !d.holded && d.value === props.mallusRoundValue
  );

  dicesToHold.forEach((dice) => {
    dice.holded = true;
  });

  return dicesToHold.length;
}

function holdAllDices() {
  props.dices.forEach((d) => (d.holded = true));
}

function endturn() {
  if (props.rollsLeft === ROLLS) {
    return;
  }
  message.value = "";
  emit("endturn");
}

async function roll() {
  if (cantRoll.value) {
    return;
  }
  if (
    props.rollsLeft < ROLLS &&
    holdedTempDices.value.length === 0 &&
    !props.mallusRound
  ) {
    message.value = "You must hold at least one die.";
    return;
  }

  holdTempDices();

  await Promise.all(props.dices.map((d) => d.roll()));

  if (props.mallusRound) {
    const count = holdMallusDices();
    if (count === 0) {
      holdAllDices();
    }
  } else if (props.rollsLeft === 1 || unholdedDices.value.length === 1) {
    unholdedDices.value.forEach((dice) => {
      dice.holded = true;
    });
  }

  emit("rolled");
}

onMounted(() => {
  document.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
      roll();
    } else if (key === "e") {
      endturn();
    }
    if (!props.mallusRound) {
      const keyNumber = parseInt(key);
      const index = keyNumber - 1;
      if (index >= 0 && index < props.dices.length) {
        props.dices[index].toggleHold();
      }
    }
  });
});
</script>

<template>
  <div class="table">
    <div class="rolls">
      <h2 class="mb-6" :class="{ mallus: mallusRound }">
        <span v-if="mallusRound"
          >Mallus Round !! Looking for: {{ mallusRoundValue }}</span
        >
        <span v-else>Normal Round. Need {{ THRESHOLD }} to enter Mallus !</span>
      </h2>
      <div class="dices mb-6">
        <Dice
          :dice="dice"
          v-for="dice in dices"
          @click="message = ''"
          :mallus-round="mallusRound"
        />
      </div>
      <div class="mb-6 total" v-if="!mallusRound">
        Total: {{ dices.reduce((sum, x) => sum + x.value, 0) }}
      </div>
      <div class="mb-6 total" v-if="mallusRound">
        Total:
        {{
          dices.filter((x) => x.value === mallusRoundValue).length *
          mallusRoundValue
        }}
      </div>
      <p class="message mb-6" v-show="message">{{ message }}</p>
      <div class="actions">
        <button class="gameBtn" @click="roll" :disabled="cantRoll">Roll !</button>
        <button class="gameBtn" @click="endturn" :disabled="rollsLeft === ROLLS">
          End turn
        </button>
      </div>
      <p class="rollsLeft">Rolls left: {{ rollsLeft }}</p>
    </div>
  </div>
</template>

<style>
.table {
  display: flex;
  align-items: center;
  height: 500px;
}
.rolls {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dices {
  display: flex;
  max-width: 600px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 1em;
}
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
}
.total {
  font-size: 2em;
}
.rollsLeft {
  font-size: 1.5em;
}
.message {
  border: 2px solid #d1d168;
  border-radius: 5px;
  padding: 1em 2em;
  color: #e5e576;
}
h2.mallus {
  color: rgb(200, 198, 88);
  font-weight: bold;
}
</style>
