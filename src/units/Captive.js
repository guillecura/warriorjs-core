import Unit from './Unit';

export default class Captive extends Unit {
  constructor() {
    super();

    this.maxHealth = 1;

    this.bind();
  }
}
