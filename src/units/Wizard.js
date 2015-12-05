import { ORDERED_RELATIVE_DIRECTIONS } from '../constants/relativeDirections';
import Ranged from './Ranged';

export default class Wizard extends Ranged {
  _shootPower = 11;
  _maxHealth = 3;

  playTurn(turn) {
    ORDERED_RELATIVE_DIRECTIONS.some((direction) => {
      if (this._isPlayerWithinReach(turn, direction)) {
        turn.shoot(direction);
        return true;
      }
    });
  }
}
