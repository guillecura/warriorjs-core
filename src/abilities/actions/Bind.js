import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;

export default class Bind extends Action {
  _description = 'Bind a unit in the given direction to keep him from moving ' +
    `(${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    const receiver = this._getUnit(direction);
    if (receiver) {
      this._unit.say(`binds ${direction} and restricts ${receiver}`);

      receiver.bind();
    } else {
      this._unit.say(`binds ${direction} and restricts nothing`);
    }
  }
}
