import { FORWARD } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;

export default class Walk extends Action {
  _description = `Move in the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);
    if (this._unit.isAlive()) {
      if (this._getSpace(direction).isEmpty()) {
        this._unit.position.move(...this._offset(direction));

        Logger.unit(this._unit.toViewObject(), `walks ${direction}`);
      } else {
        Logger.unit(this._unit.toViewObject(), `bumps into ${this._getSpace(direction)}`);
      }
    }
  }
}
