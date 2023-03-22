import { INITIAL_POINT } from "./constants";
export default class PlayerModel {
  name: string;
  point: number;
  isActive: boolean;
  alive: boolean;
  constructor(_name: string) {
    this.name = _name;
    this.point = INITIAL_POINT;
    this.isActive = false;
    this.alive = true;
  }
}
