import RelativeDirections from '../constants/RelativeDirections';

class Base {
  _unit;
  _description;

  constructor(unit) {
    this._unit = unit;
  }

  getDescription() {
    return this._description;
  }

  offset(direction, forward = 1, right = 0) {
    switch (direction) {
    case RelativeDirections.forward:
      return [forward, -right];
    case RelativeDirections.backward:
      return [-forward, right];
    case RelativeDirections.right:
      return [right, forward];
    case RelativeDirections.left:
      return [-right, -forward];
    default:
      throw new Error(`Unknown direction '${direction}'`);
    }
  }

  getSpace(direction, forward = 1, right = 0) {
    const [forwardOffset, rightOffset] = this.offset(direction, forward, right);
    return this._unit.getPosition().getRelativeSpace(forwardOffset, rightOffset);
  }

  getUnit(direction, forward = 1, right = 0) {
    return this.getSpace(direction, forward, right).getUnit();
  }

  damage(receiver, amount) {
    receiver.takeDamage(amount);
    if (!receiver.isAlive()) {
      this._unit.earnPoints(receiver.getMaxHealth());
    }
  }

  passTurn() {
    // Callback which is triggered every turn
  }

  verifyDirection(direction) {
    const directions = Object.values(RelativeDirections);
    if (!directions.includes(direction)) {
      throw new Error(`Unknown direction '${direction}'. Should be one of: ${directions.join(', ')}.`);
    }
  }
}

export default Base;
