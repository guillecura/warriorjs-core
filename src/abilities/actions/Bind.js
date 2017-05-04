import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;

export default class Bind extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Bind a unit in the given direction to keep him from moving (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    const receiver = this.unit.position.getRelativeSpace(direction).getUnit();
    if (receiver) {
      this.unit.say(`binds ${direction} and restricts ${receiver}`);

      receiver.bind();
    } else {
      this.unit.say(`binds ${direction} and restricts nothing`);
    }
  }
}
