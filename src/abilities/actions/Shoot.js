import RelativeDirections from '../../constants/RelativeDirections';
import Ability from '../Ability';

class Shoot extends Ability {
  _description = 'Shoot your bow & arrow in given direction (forward by default).';

  perform(direction = RelativeDirections.forward) {
    this.verifyDirection(direction);
    const receiver = this.getUnits(direction, [1, 2, 3]).shift();
    if (receiver) {
      this._unit.say(`shoots ${direction} and hits ${receiver}`);
      this.damage(receiver, this._unit.getShootPower());
    } else {
      this._unit.say(`shoots ${direction} and hits nothing`);
    }
  }

  getUnits(direction, range) {
    return range.map(offset => this.getUnit(direction, offset)).filter(unit => unit);
  }
}

export default Shoot;
