import { FORWARD } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;

export default class Bind extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Bind a unit in the given direction to keep him from moving (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    const state = this.getStateWithDirection('binding', direction);

    const receiver = this.getUnit(direction);
    if (receiver) {
      Logger.unit(this.unit, state, `binds ${direction} and restricts ${receiver}`);

      receiver.bind();
    } else {
      Logger.unit(this.unit, state, `binds ${direction} and restricts nothing`);
    }
  }
}
