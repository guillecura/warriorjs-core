import RelativeDirections from '../../constants/RelativeDirections';
import Ability from '../Ability';

const TARGET_DAMAGE_AMOUNT = 8;
const SURROUNDING_DAMAGE_AMOUNT = 4;
const SURROUNDINGS = [
  [1, 1],
  [1, -1],
  [2, 0],
  [0, 0],
];

class Detonate extends Ability {
  _description = 'Detonate a bomb in a given direction (forward by default) which damages that space and surrounding 4 spaces (including yourself).';

  perform(direction = RelativeDirections.forward) {
    this.verifyDirection(direction);
    if (this._unit.getPosition()) {
      this._unit.say(`detonates a bomb ${direction} launching a deadly explosion.`);
      this.bomb(direction, 1, 0, TARGET_DAMAGE_AMOUNT);
      SURROUNDINGS.forEach(([x, y]) => this.bomb(direction, x, y, SURROUNDING_DAMAGE_AMOUNT));
    }
  }

  bomb(direction, x, y, damageAmount) {
    if (this._unit.getPosition()) {
      const receiver = this.getSpace(direction, x, y).getUnit();
      if (receiver) {
        if (receiver.getActions().explode) {
          receiver.say('caught in bomb\'s flames which detonates ticking explosive');
          receiver.getActions().explode.perform();
        } else {
          this.damage(receiver, damageAmount);
        }
      }
    }
  }
}

export default Detonate;
