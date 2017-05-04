import { camelCase } from 'lodash';

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
}
