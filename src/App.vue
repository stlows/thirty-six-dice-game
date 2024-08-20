<script setup lang="ts">
import { reactive, ref } from "vue";
import Players from "./components/Players.vue";
import Table from "./components/Table.vue";
import LogBook from "./components/Logbook.vue";
import PlayerModel from "@/models/PlayerModel";
import DiceModel from "./models/DiceModel";
import { THRESHOLD, DICES_COUNT, ROLLS } from "./models/constants";

const players = reactive<Array<PlayerModel>>([]);
const dices = reactive<Array<DiceModel>>([]);
const rollsLeft = ref(ROLLS);
const mallusRound = ref(false);
const mallusRoundValue = ref(0);
const logs = reactive<Array<string>>([]);
players.push(new PlayerModel("Vincent"));
players.push(new PlayerModel("Stephanie"));
players.push(new PlayerModel("Bertrand"));
players.push(new PlayerModel("Jocelyne"));
let activePlayerIndex = 0;
players[activePlayerIndex].isActive = true;
for (let i = 0; i < DICES_COUNT; i++) {
  dices.push(new DiceModel());
}

function endturn() : void {
  if (mallusRound.value) {
    const count = dices.filter(
      (d) => d.value === mallusRoundValue.value
    ).length;
    const nextPlayer = players[nextAlivePlayerIndex()];
    const sum = count * mallusRoundValue.value;
    nextPlayer.point -= sum;
    if (nextPlayer.point <= 0) {
      killPlayer(nextPlayer);
    }
    logs.unshift(
      `${players[activePlayerIndex].name} rolled ${count} ${mallusRoundValue.value}. ${nextPlayer.name} lost ${sum} points.`
    );
  } else {
    const sum = dices.reduce((sum, x) => sum + x.value, 0);
    const delta = sum - THRESHOLD;
    players[activePlayerIndex].point += delta;

    logs.unshift(
      `${players[activePlayerIndex].name} got a ${sum}. ${
        delta > 0 ? "Winning" : "Losing"
      } ${Math.abs(delta)} points.`
    );
    if (players[activePlayerIndex].point <= 0) {
      killPlayer(players[activePlayerIndex]);
    }
    if (delta > 0) {
      initiateMallusRound(delta);
      return;
    }
  }
  nextPlayer();
  mallusRound.value = false;
  mallusRoundValue.value = 0;
}

function initiateMallusRound(delta: number) {
  mallusRoundValue.value = delta;
  mallusRound.value = true;
  rollsLeft.value = ROLLS;
  resetDices();
}

function nextPlayer() {
  players[activePlayerIndex].isActive = false;
  activePlayerIndex = nextAlivePlayerIndex();
  players[activePlayerIndex].isActive = true;
  resetDices();
}

function killPlayer(player: PlayerModel) {
  player.alive = false;
  if (players.filter((p) => p.alive).length === 1) {
    logs.unshift(players.find((p) => p.alive)?.name + " won the game !");
  }
}

function nextAlivePlayerIndex(): number {
  let i = (activePlayerIndex + 1) % players.length;
  while (!players[i].alive) {
    i = (i + 1) % players.length;
  }
  return i;
}

function resetDices() : void {
  dices.forEach((d) => d.reset());
  rollsLeft.value = ROLLS;
}

function rolled() : void {
  if (dices.filter((d) => !d.holded).length === 0) {
    rollsLeft.value = 1;
  }
  rollsLeft.value--;
}
</script>

<template>
  <section>
    <Players :players="players" />
    <LogBook :logs="logs" />
  </section>

  <main>
    <Table
      :dices="dices"
      :rollsLeft="rollsLeft"
      :mallusRound="mallusRound"
      :mallusRoundValue="mallusRoundValue"
      @rolled="rolled"
      @endturn="endturn"
    />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
