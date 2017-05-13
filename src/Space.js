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

  isEmpty() {
    return !this.getUnit() && !this.isWall();
  }

  isStairs() {
    const [stairsX, stairsY] = this.floor.stairsLocation;
    const [x, y] = this.getLocation();
    return stairsX === x && stairsY === y;
  }

  isWarrior() {
    const unit = this.getUnit();
    return !!unit && unit.type === 'Warrior';
  }

  isPlayer() {
    return this.isWarrior();
  }

  isBound() {
    const unit = this.getUnit();
    return !!unit && unit.isBound();
  }

  isEnemy() {
    return !!this.getUnit() && !this.isPlayer() && !this.isBound();
  }

  is(effect) {
    const unit = this.getUnit();
    return !!unit && unit.effects.has(effect);
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
