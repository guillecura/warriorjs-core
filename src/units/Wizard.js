import { RELATIVE_DIRECTION_ARRAY } from '../constants/directions';
import Ranged from './Ranged';

export default class Wizard extends Ranged {
  _shootPower = 11;
  _maxHealth = 3;

  playTurn(turn) {
    const playerDirection = RELATIVE_DIRECTION_ARRAY.filter(direction =>
      this._isPlayerWithinReach(turn, direction),
    )[0];

    if (playerDirection) {
      turn.shoot(playerDirection);
    }
  }
}
