import { BACKWARD, RELATIVE_DIRECTION_ARRAY } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = BACKWARD;

export default class Pivot extends Action {
  _description = `Rotate in the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    this._unit.say(`pivots ${direction}`);

    this._unit.position.rotate(RELATIVE_DIRECTION_ARRAY.indexOf(direction));
  }
}
