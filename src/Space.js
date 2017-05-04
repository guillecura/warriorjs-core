import playerObject from './decorators/playerObject';

const propertyBlacklist = ['constructor', 'floor', 'location', 'unit', 'toString', 'x', 'y'];

@playerObject(propertyBlacklist)
export default class Space {
  constructor(floor, x, y) {
    this.floor = floor;
    this.x = x;
    this.y = y;
  }

  getLocation() {
    return [this.x, this.y];
  }

  getUnit() {
    return this.floor.getUnitAt(...this.getLocation());
  }

  isWall() {
    return this.floor.isOutOfBounds(...this.getLocation());
  }

  isWarrior() {
    const unit = this.getUnit();
    return !!unit && unit.getType() === 'warrior';
  }

  isPlayer() {
    return this.isWarrior();
  }

  isEnemy() {
    return !!this.getUnit() && !this.isPlayer() && !this.isBound();
  }

  isBound() {
    const unit = this.getUnit();
    return !!unit && unit.isBound();
  }

  isTicking() {
    const unit = this.getUnit();
    return !!unit && unit.effects.has('ticking');
  }

  isEmpty() {
    return !this.getUnit() && !this.isWall();
  }

  isStairs() {
    const [stairsX, stairsY] = this.floor.stairsLocation;
    const [x, y] = this.getLocation();
    return stairsX === x && stairsY === y;
  }

  toString() {
    const unit = this.getUnit();
    if (unit) {
      return unit.toString();
    }

    if (this.isWall()) {
      return 'wall';
    }

    return 'nothing';
  }
}
