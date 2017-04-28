import { RELATIVE_DIRECTION_ARRAY } from '../constants/directions';
import Melee from './Melee';

export default class Sludge extends Melee {
  constructor(index) {
    super(index);

    this.maxHealth = 12;
    this.attackPower = 3;
  }

  playTurn(turn) {
    const playerDirection = RELATIVE_DIRECTION_ARRAY.filter(direction =>
      this.isPlayerWithinReach(turn, direction),
    )[0];

    if (playerDirection) {
      turn.attack(playerDirection);
    }
  }
}
