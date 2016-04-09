import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;

export default class Walk extends Action {
  _description = `Move in the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);
    if (this._unit.isAlive()) {
      this._unit.say(`walks ${direction}`);

      if (this._getSpace(direction).isEmpty()) {
        this._unit.position.move(...this._offset(direction));
      } else {
        this._unit.say(`bumps into ${this._getSpace(direction)}`);
      }
    }
  }
}
