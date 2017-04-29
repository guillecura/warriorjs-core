import { FORWARD } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;

export default class Walk extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Move in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    const state = this.getStateWithDirection('walking', direction);

    if (this.unit.isAlive()) {
      if (this.getSpace(direction).isEmpty()) {
        this.unit.position.move(...this.offset(direction));

        Logger.unit(this.unit, state, `walks ${direction}`);
      } else {
        Logger.unit(
          this.unit,
          state,
          `walks ${direction} and bumps into ${this.getSpace(direction)}`,
        );
      }
    }
  }
}
