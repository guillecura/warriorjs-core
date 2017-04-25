import { RELATIVE_DIRECTION_ARRAY } from '../constants/directions';
import Melee from './Melee';

export default class Sludge extends Melee {
  _attackPower = 3;
  _maxHealth = 12;

  playTurn(turn) {
    const playerDirection = RELATIVE_DIRECTION_ARRAY.filter(direction =>
      this._isPlayerWithinReach(turn, direction),
    )[0];

    if (playerDirection) {
      turn.attack(playerDirection);
    }
  }
}
