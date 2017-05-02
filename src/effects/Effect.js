import { camelCase } from 'lodash';

export default class Effect {
  constructor(unit, duration = Infinity) {
    this.unit = unit;
    this.time = duration;
  }

  getName() {
    return camelCase(this.constructor.name);
  }

  passTurn() {
    if (this.time) {
      this.time -= 1;
      if (!this.time) {
        this.unit.removeEffect(this.getName());
      }
    }

    this.activate();
  }

  // eslint-disable-next-line
  activate() {
    // To be overriden by subclass
  }
}
