import { ATTACKING } from '../../constants/states';
import { FORWARD, BACKWARD } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;

export default class Attack extends Action {
  _description = `Attack a unit in the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    const receiver = this._getUnit(direction);
    if (receiver) {
      Logger.unit(
        this._unit.toViewObject(),
        ATTACKING,
        `attacks ${direction} and hits ${receiver}`,
      );

      const power = direction === BACKWARD ?
        Math.ceil(this._unit.attackPower / 2.0) :
        this._unit.attackPower;
      this._damage(receiver, power);
    } else {
      Logger.unit(this._unit.toViewObject(), ATTACKING, `attacks ${direction} and hits nothing`);
    }
  }
}
