import { BACKWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = BACKWARD;

export default class Pivot extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Rotate in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.unit.position.rotate(direction);

    this.unit.say(`pivots ${direction}`);
  }
}
