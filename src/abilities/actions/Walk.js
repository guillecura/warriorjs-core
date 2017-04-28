import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;

export default class Walk extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Move in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);
    if (this.unit.isAlive()) {
      this.unit.say(`walks ${direction}`);

      if (this.getSpace(direction).isEmpty()) {
        this.unit.position.move(...this.offset(direction));
      } else {
        this.unit.say(`bumps into ${this.getSpace(direction)}`);
      }
    }
  }
}
