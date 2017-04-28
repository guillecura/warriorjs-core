import { RELATIVE_DIRECTION_ARRAY } from '../constants/directions';
import Ranged from './Ranged';

export default class Wizard extends Ranged {
  constructor(index) {
    super(index);

    this.maxHealth = 3;
    this.shootPower = 11;
  }

  playTurn(turn) {
    const playerDirection = RELATIVE_DIRECTION_ARRAY.filter(direction =>
      this.isPlayerWithinReach(turn, direction),
    )[0];

    if (playerDirection) {
      turn.shoot(playerDirection);
    }
  }
}
