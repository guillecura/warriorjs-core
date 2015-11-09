import RelativeDirections from '../constants/RelativeDirections';
import UnitTypes from '../constants/UnitTypes';
import Melee from './Melee';

class Sludge extends Melee {
  _name = 'Sludge';
  _type = UnitTypes.sludge;
  _attackPower = 3;
  _maxHealth = 12;

  playTurn(turn) {
    Object.values(RelativeDirections).some(direction => {
      if (this.isPlayerReachable(turn, direction)) {
        turn.attack(direction);
        return true;
      }
    });
  }
}

export default Sludge;
