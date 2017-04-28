import Unit from './Unit';

export default class Captive extends Unit {
  constructor(index) {
    super(index);

    this.maxHealth = 1;

    this.bind();
  }
}
