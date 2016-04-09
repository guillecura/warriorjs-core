import { RELATIVE_DIRECTION_ARRAY } from '../constants/directions';
import Melee from './Melee';

export default class Sludge extends Melee {
  _attackPower = 3;
  _maxHealth = 12;

  playTurn(turn) {
    for (const direction of RELATIVE_DIRECTION_ARRAY) {
      if (this._isPlayerWithinReach(turn, direction)) {
        turn.attack(direction);
        break;
      }
    }
  }
}
