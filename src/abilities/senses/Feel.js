import { FORWARD } from '../../constants/directions';
import Sense from './Sense';

const DEFAULT_DIRECTION = FORWARD;

export default class Feel extends Sense {
  constructor(unit) {
    super(unit);

    this.description = `Return a Space for the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    return this.getSpace(direction).toPlayerObject();
  }
}
