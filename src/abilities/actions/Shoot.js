import { range } from 'lodash';

import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;
const ATTACK_RANGE = 3;

export default class Shoot extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Shoot your bow & arrow in given direction (${DEFAULT_DIRECTION} by default).`;
  }

  getUnits(direction, offsets) {
    return offsets.map(offset => this.getUnit(direction, offset)).filter(unit => unit);
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    const receiver = this.getUnits(direction, range(1, ATTACK_RANGE + 1))[0];
    if (receiver) {
      this.unit.say(`shoots ${direction} and hits ${receiver}`);

      this.damage(receiver, this.unit.shootPower);
    } else {
      this.unit.say(`shoots ${direction} and hits nothing`);
    }
  }
}
