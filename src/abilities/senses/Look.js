import range from 'lodash.range';
import { RELATIVE_DIRECTIONS } from '../../constants/relativeDirections';
import Sense from './Sense';

const DEFAULT_DIRECTION = RELATIVE_DIRECTIONS.forward;
const VISION_RANGE = 3;

export default class Look extends Sense {
  _description = `Returns an array of up to ${VISION_RANGE} spaces in the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    return range(1, VISION_RANGE + 1).map((offset) => this._getSpace(direction, offset).toPlayerObject());
  }
}
