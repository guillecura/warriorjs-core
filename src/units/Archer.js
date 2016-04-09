import { RELATIVE_DIRECTION_ARRAY } from '../constants/directions';
import Ranged from './Ranged';

export default class Archer extends Ranged {
  _shootPower = 3;
  _maxHealth = 7;

  playTurn(turn) {
    for (const direction of RELATIVE_DIRECTION_ARRAY) {
      if (this._isPlayerWithinReach(turn, direction)) {
        turn.shoot(direction);
        break;
      }
    }
  }
}
