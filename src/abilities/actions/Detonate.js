import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;
const TARGET_DAMAGE_AMOUNT = 8;
const COLATERAL_DAMAGE_AMOUNT = 4;
const SURROUNDINGS = [[1, 1], [1, -1], [2, 0], [0, 0]];

export default class Detonate extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Detonate a bomb in a given direction (${DEFAULT_DIRECTION} by default) which damages that space and surrounding 4 spaces (including yourself).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    if (this.unit.isAlive()) {
      this.unit.say(`detonates a bomb ${direction} launching a deadly explosion`);

      const targetSpace = this.getSpace(direction, 1, 0);
      this.bomb(targetSpace, TARGET_DAMAGE_AMOUNT);

      SURROUNDINGS.map(([x, y]) => this.getSpace(direction, x, y)).forEach(surroundingSpace =>
        this.bomb(surroundingSpace, COLATERAL_DAMAGE_AMOUNT),
      );
    }
  }

  bomb(space, damageAmount) {
    const receiver = space.getUnit();
    if (receiver) {
      if (receiver.abilities.has('explode')) {
        receiver.say("caught in bomb's flames which detonates ticking explosive");

        receiver.abilities.get('explode').perform();
      } else {
        this.damage(receiver, damageAmount);
      }
    }
  }
}
