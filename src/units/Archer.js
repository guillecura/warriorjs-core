import RelativeDirections from '../constants/RelativeDirections';
import UnitTypes from '../constants/UnitTypes';
import Ranged from './Ranged';

class Archer extends Ranged {
  _name = 'Archer';
  _type = UnitTypes.archer;
  _shootPower = 3;
  _maxHealth = 7;

  playTurn(turn) {
    Object.values(RelativeDirections).some(direction => {
      if (this.isPlayerInSight(turn, direction)) {
        turn.shoot(direction);
        return true;
      }
    });
  }
}

export default Archer;
