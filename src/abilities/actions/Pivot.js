import { BACKWARD, RELATIVE_DIRECTION_ARRAY } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = BACKWARD;

export default class Pivot extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Rotate in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    this.unit.position.rotate(RELATIVE_DIRECTION_ARRAY.indexOf(direction));

    const state = this.getStateWithDirection('pivoting', direction);

    Logger.unit(this.unit, state, `pivots ${direction}`);
  }
}
