import { range } from 'lodash';

import { FORWARD } from '../../constants/directions';
import Sense from './Sense';

const DEFAULT_DIRECTION = FORWARD;
const VISION_RANGE = 3;

export default class Look extends Sense {
  constructor(unit) {
    super(unit);

    this.description = `Returns an array of up to ${VISION_RANGE} spaces in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    return range(1, VISION_RANGE + 1).map(offset =>
      this.getSpace(direction, offset).toPlayerObject(),
    );
  }
}
