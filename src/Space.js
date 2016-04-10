import { playerObject } from './decorators/playerObject';

const propertyBlacklist = [
  '_floor',
  '_x',
  '_y',
  'constructor',
  'location',
  'unit',
];

@playerObject(propertyBlacklist)
export default class Space {
  _floor;
  _x;
  _y;

  constructor(floor, x, y) {
    this._floor = floor;
    this._x = x;
    this._y = y;
  }

  get location() {
    return [this._x, this._y];
  }

  get unit() {
    return this._floor.getUnitAt(...this.location);
  }

  isWall() {
    return this._floor.isOutOfBounds(...this.location);
  }

  isWarrior() {
    return !!this.unit && this.unit.type === 'warrior';
  }

  isPlayer() {
    return this.isWarrior();
  }

  isEnemy() {
    return !!this.unit && !this.isPlayer() && !this.isCaptive();
  }

  isCaptive() {
    return !!this.unit && this.unit.isBound();
  }

  isTicking() {
    return !!this.unit && 'explode' in this.unit.abilities;
  }

  isEmpty() {
    return !this.unit && !this.isWall();
  }

  isStairs() {
    const [stairsX, stairsY] = this._floor.stairsLocation;
    const [x, y] = this.location;
    return stairsX === x && stairsY === y;
  }

  toString() {
    if (this.unit) {
      return this.unit.toString();
    }

    if (this.isWall()) {
      return 'wall';
    }

    return 'nothing';
  }
}
