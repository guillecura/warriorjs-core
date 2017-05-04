import { BACKWARD, FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;

export default class Attack extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Attack a unit in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    const receiver = this.unit.position.getRelativeSpace(direction).getUnit();
    if (receiver) {
      this.unit.say(`attacks ${direction} and hits ${receiver}`);

      const power = direction === BACKWARD
        ? Math.ceil(this.unit.attackPower / 2.0)
        : this.unit.attackPower;

      this.unit.damage(receiver, power);
    } else {
      this.unit.say(`attacks ${direction} and hits nothing`);
    }
  }
}
