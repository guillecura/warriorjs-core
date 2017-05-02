import { camelCase, startCase } from 'lodash';

import { BACKWARD, FORWARD, LEFT, RELATIVE_DIRECTION_ARRAY, RIGHT } from '../constants/directions';

export default class Ability {
  constructor(unit) {
    this.unit = unit;
  }

  getName() {
    return camelCase(this.constructor.name);
  }

  // eslint-disable-next-line
  perform() {
    // To be overriden by subclass
  }

  // eslint-disable-next-line
  verifyDirection(direction) {
    if (!RELATIVE_DIRECTION_ARRAY.includes(direction)) {
      const validDirections = RELATIVE_DIRECTION_ARRAY.map(
        validDirection => `'${validDirection}'`,
      ).join(', ');
      throw new Error(`Unknown direction '${direction}'. Should be one of: ${validDirections}.`);
    }
  }

  // eslint-disable-next-line
  getStateWithDirection(state, direction) {
    return `${state}${startCase(direction)}`;
  }

  // eslint-disable-next-line
  offset(direction, forward = 1, right = 0) {
    switch (direction) {
      case FORWARD:
        return [forward, -right];
      case BACKWARD:
        return [-forward, right];
      case RIGHT:
        return [right, forward];
      case LEFT:
        return [-right, -forward];
      default:
        throw new Error(`Unknown direction '${direction}'.`);
    }
  }

  getSpace(direction, forward = 1, right = 0) {
    return this.unit.position.getRelativeSpace(...this.offset(direction, forward, right));
  }

  getUnit(direction, forward = 1, right = 0) {
    return this.getSpace(direction, forward, right).getUnit();
  }
}
