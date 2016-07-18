import { FORWARD } from '../../constants/directions';
import { WALKING } from '../../constants/states';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;

export default class Walk extends Action {
  _description = `Move in the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);
    if (this._unit.isAlive()) {
      const state = this._getStateWithDirection(WALKING, direction);

      if (this._getSpace(direction).isEmpty()) {
        this._unit.position.move(...this._offset(direction));

        Logger.unit(this._unit.toViewObject(), state, `walks ${direction}`);
      } else {
        Logger.unit(this._unit.toViewObject(), state, `bumps into ${this._getSpace(direction)}`);
      }
    }
  }
}
