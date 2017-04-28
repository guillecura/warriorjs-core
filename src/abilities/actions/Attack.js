import { FORWARD, BACKWARD } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;

export default class Attack extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Attack a unit in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    const receiver = this.getUnit(direction);
    if (receiver) {
      Logger.unit(this.unit, `attacks ${direction} and hits ${receiver}`);

      const power = direction === BACKWARD
        ? Math.ceil(this.unit.attackPower / 2.0)
        : this.unit.attackPower;

      this.damage(receiver, power);
    } else {
      Logger.unit(this.unit, `attacks ${direction} and hits nothing`);
    }
  }
}
