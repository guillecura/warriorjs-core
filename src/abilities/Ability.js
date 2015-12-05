import { RELATIVE_DIRECTIONS, ORDERED_RELATIVE_DIRECTIONS } from '../constants/relativeDirections';

class Ability {
  _unit;
  _description;

  constructor(unit) {
    this._unit = unit;
  }

  get description() {
    return this._description;
  }

  passTurn() {
    // Callback which is triggered every turn
  }

  perform() {
    // To be overriden by subclass
  }

  _offset(direction, forward = 1, right = 0) {
    if (direction === RELATIVE_DIRECTIONS.forward) {
      return [forward, -right];
    } else if (direction === RELATIVE_DIRECTIONS.backward) {
      return [-forward, right];
    } else if (direction === RELATIVE_DIRECTIONS.right) {
      return [right, forward];
    } else if (direction === RELATIVE_DIRECTIONS.left) {
      return [-right, -forward];
    }

    throw new Error(`Unknown direction '${direction}'.`);
  }

  _getSpace(direction, forward = 1, right = 0) {
    return this._unit.position.getRelativeSpace(...this._offset(direction, forward, right));
  }

  _getUnit(direction, forward = 1, right = 0) {
    return this._getSpace(direction, forward, right).unit;
  }

  _verifyDirection(direction) {
    if (!ORDERED_RELATIVE_DIRECTIONS.includes(direction)) {
      const validDirections = ORDERED_RELATIVE_DIRECTIONS
        .map((validDirection) => `'${validDirection}'`)
        .join(', ');
      throw new Error(`Unknown direction '${direction}'. Should be one of: ${validDirections}.`);
    }
  }
}

export default Ability;
