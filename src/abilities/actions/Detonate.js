import { FORWARD } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;
const TARGET_DAMAGE_AMOUNT = 8;
const COLATERAL_DAMAGE_AMOUNT = 4;
const SURROUNDINGS = [
  [1, 1],
  [1, -1],
  [2, 0],
  [0, 0],
];

export default class Detonate extends Action {
  _description = `Detonate a bomb in a given direction (${DEFAULT_DIRECTION} by default) which ` +
    'damages that space and surrounding 4 spaces (including yourself).';

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    if (this._unit.isAlive()) {
      Logger.unit(
        this._unit.toViewObject(),
        `detonates a bomb ${direction} launching a deadly explosion`
      );

      const targetSpace = this._getSpace(direction, 1, 0);
      this._bomb(targetSpace, TARGET_DAMAGE_AMOUNT);

      SURROUNDINGS
        .map(([x, y]) => this._getSpace(direction, x, y))
        .forEach(surroundingSpace => this._bomb(surroundingSpace, COLATERAL_DAMAGE_AMOUNT));
    }
  }

  _bomb(space, damageAmount) {
    const receiver = space.unit;
    if (receiver) {
      if ('explode' in receiver.abilities) {
        Logger.unit(
          receiver.toViewObject(),
          'caught in bomb\'s flames which detonates ticking explosive'
        );

        receiver.abilities.explode.perform();
      } else {
        this._damage(receiver, damageAmount);
      }
    }
  }
}
