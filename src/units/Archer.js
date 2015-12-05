import { ORDERED_RELATIVE_DIRECTIONS } from '../constants/relativeDirections';
import Ranged from './Ranged';

export default class Archer extends Ranged {
  _shootPower = 3;
  _maxHealth = 7;

  playTurn(turn) {
    ORDERED_RELATIVE_DIRECTIONS.some((direction) => {
      if (this._isPlayerWithinReach(turn, direction)) {
        turn.shoot(direction);
        return true;
      }
    });
  }
}
