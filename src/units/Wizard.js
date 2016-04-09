import { RELATIVE_DIRECTION_ARRAY } from '../constants/directions';
import Ranged from './Ranged';

export default class Wizard extends Ranged {
  _shootPower = 11;
  _maxHealth = 3;

  playTurn(turn) {
    for (const direction of RELATIVE_DIRECTION_ARRAY) {
      if (this._isPlayerWithinReach(turn, direction)) {
        turn.shoot(direction);
        break;
      }
    }
  }
}
