import { RELATIVE_DIRECTIONS } from '../../constants/relativeDirections';
import Sense from './Sense';

const DEFAULT_DIRECTION = RELATIVE_DIRECTIONS.forward;

export default class Feel extends Sense {
  _description = `Return a Space for the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    return this._getSpace(direction).toPlayerObject();
  }
}
