import { BACKWARD, FORWARD, LEFT, RELATIVE_DIRECTION_ARRAY, RIGHT } from '../constants/directions';

export default class Ability {
  _unit;
  _description;

  constructor(unit) {
    this._unit = unit;
  }

  get description() {
    return this._description;
  }

  // eslint-disable-next-line
  passTurn() {
    // Callback which is triggered every turn
  }

  // eslint-disable-next-line
  perform() {
    // To be overriden by subclass
  }

  // eslint-disable-next-line
  _verifyDirection(direction) {
    if (!RELATIVE_DIRECTION_ARRAY.includes(direction)) {
      const validDirections = RELATIVE_DIRECTION_ARRAY.map(
        validDirection => `'${validDirection}'`,
      ).join(', ');
      throw new Error(`Unknown direction '${direction}'. Should be one of: ${validDirections}.`);
    }
  }

  // eslint-disable-next-line
  _offset(direction, forward = 1, right = 0) {
    if (direction === FORWARD) {
      return [forward, -right];
    } else if (direction === BACKWARD) {
      return [-forward, right];
    } else if (direction === RIGHT) {
      return [right, forward];
    } else if (direction === LEFT) {
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
}
