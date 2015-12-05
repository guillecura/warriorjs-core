import { RELATIVE_DIRECTIONS } from '../../constants/relativeDirections';
import Action from './Action';

const DEFAULT_DIRECTION = RELATIVE_DIRECTIONS.forward;

export default class Shoot extends Action {
  _description = `Shoot your bow & arrow in given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    const receiver = this._getUnits(direction, [1, 2, 3])[0];
    if (receiver) {
      this._unit.say(`shoots ${direction} and hits ${receiver}`);

      this._damage(receiver, this._unit.shootPower);
    } else {
      this._unit.say(`shoots ${direction} and hits nothing`);
    }
  }

  _getUnits(direction, offsets) {
    return offsets
      .map((offset) => this._getUnit(direction, offset))
      .filter((unit) => unit);
  }
}