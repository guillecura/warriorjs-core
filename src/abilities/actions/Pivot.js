import { RELATIVE_DIRECTIONS, ORDERED_RELATIVE_DIRECTIONS } from '../../constants/relativeDirections';
import Action from './Action';

const DEFAULT_DIRECTION = RELATIVE_DIRECTIONS.backward;

export default class Pivot extends Action {
  _description = `Rotate in the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    this._unit.say(`pivots ${direction}`);

    this._unit.position.rotate(ORDERED_RELATIVE_DIRECTIONS.indexOf(direction));
  }
}
