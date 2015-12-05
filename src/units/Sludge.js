import { ORDERED_RELATIVE_DIRECTIONS } from '../constants/relativeDirections';
import Melee from './Melee';

export default class Sludge extends Melee {
  _attackPower = 3;
  _maxHealth = 12;

  playTurn(turn) {
    ORDERED_RELATIVE_DIRECTIONS.some((direction) => {
      if (this._isPlayerWithinReach(turn, direction)) {
        turn.attack(direction);
        return true;
      }
    });
  }
}
