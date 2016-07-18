import { BINDING } from '../../constants/states';
import { FORWARD } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;

export default class Bind extends Action {
  _description = 'Bind a unit in the given direction to keep him from moving ' +
    `(${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    const state = this._getStateWithDirection(BINDING, direction);

    const receiver = this._getUnit(direction);
    if (receiver) {
      Logger.unit(
        this._unit.toViewObject(),
        state,
        `binds ${direction} and restricts ${receiver}`,
      );

      receiver.bind();
    } else {
      Logger.unit(this._unit.toViewObject(), state, `binds ${direction} and restricts nothing`);
    }
  }
}
