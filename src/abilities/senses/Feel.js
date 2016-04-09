import { FORWARD } from '../../constants/directions';
import Sense from './Sense';

const DEFAULT_DIRECTION = FORWARD;

export default class Feel extends Sense {
  _description = `Return a Space for the given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    return this._getSpace(direction).toPlayerObject();
  }
}
