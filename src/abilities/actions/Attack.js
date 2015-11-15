import RelativeDirections from '../../constants/RelativeDirections';
import Action from './Action';

class Attack extends Action {
  _description = 'Attacks a unit in given direction (forward by default).';

  perform(direction = RelativeDirections.forward) {
    this.verifyDirection(direction);
    const receiver = this.getUnit(direction);
    if (receiver) {
      this._unit.say(`attacks ${direction} and hits ${receiver}`);
      const power = direction === RelativeDirections.backward ?
        Math.ceil(this._unit.getAttackPower() / 2.0) :
        this._unit.getAttackPower();
      this.damage(receiver, power);
    } else {
      this._unit.say(`attacks ${direction} and hits nothing`);
    }
  }
}

export default Attack;
