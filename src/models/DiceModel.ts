export default class DiceModel {
  value!: number;
  randomizer: Array<number>;
  holded!: boolean;
  holdedTemp!: boolean;
  constructor(value: number = 0) {
    this.randomizer = [4, 6, 2, 1, 4, 5, 3, 2, 5, 1];
    this.reset(value);
  }
  async roll() {
    return new Promise((resolve) => {
      if (this.holded) {
        resolve(this.value);
        return;
      }
      let index = Math.floor(Math.random() * this.randomizer.length);
      let count = 0;
      const interval = setInterval(() => {
        if (count == this.randomizer.length) {
          clearInterval(interval);
          this.value = Math.floor(Math.random() * 6) + 1;
          resolve(this.value);
        }
        this.value = this.randomizer[index];
        index = (index + 1) % this.randomizer.length;
        count++;
      }, 30);
    });
  }
  toggleHold() {
    if (this.value === 0 || this.holded) {
      return;
    }
    this.holdedTemp = !this.holdedTemp;
  }
  reset(value: number = 0) {
    this.holded = false;
    this.value = value;
    this.holdedTemp = false;
  }
}
