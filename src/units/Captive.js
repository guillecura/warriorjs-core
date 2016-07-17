import Unit from './Unit';

export default class Captive extends Unit {
  _maxHealth = 1;

  constructor(id) {
    super(id);

    this.bind();
  }
}
