import RelativeDirections from '../constants/RelativeDirections';
import Ranged from './Ranged';

class Wizard extends Ranged {
  _name = 'Wizard';
  _shootPower = 11;
  _maxHealth = 3;

  playTurn(turn) {
    Object.values(RelativeDirections).some(direction => {
      if (this.isPlayerInSight(turn, direction)) {
        turn.shoot(direction);
        return true;
      }
    });
  }
}

export default Wizard;
