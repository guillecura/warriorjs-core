import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;

export default class Walk extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Move in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    if (this.unit.isAlive()) {
      if (this.unit.position.getRelativeSpace(direction).isEmpty()) {
        this.unit.position.move(direction);

        this.unit.say(`walks ${direction}`);
      } else {
        this.unit.say(
          `walks ${direction} and bumps into ${this.unit.position.getRelativeSpace(direction)}`,
        );
      }
    }
  }
}
