import range from 'lodash.range';
import { FORWARD } from '../../constants/directions';
import { SHOOTING } from '../../constants/states';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;
const ATTACK_RANGE = 3;

export default class Shoot extends Action {
  _description = `Shoot your bow & arrow in given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    const state = this._getStateWithDirection(SHOOTING, direction);

    const receiver = this._getUnits(direction, range(1, ATTACK_RANGE + 1))[0];
    if (receiver) {
      Logger.unit(this._unit.toViewObject(), state, `shoots ${direction} and hits ${receiver}`);

      this._damage(receiver, this._unit.shootPower);
    } else {
      Logger.unit(this._unit.toViewObject(), state, `shoots ${direction} and hits nothing`);
    }
  }

  _getUnits(direction, offsets) {
    return offsets
      .map(offset => this._getUnit(direction, offset))
      .filter(unit => unit);
  }
}
