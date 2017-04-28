import Sense from './Sense';

export default class Health extends Sense {
  constructor(unit) {
    super(unit);

    this.description = 'Return an integer representing your health.';
  }

  perform() {
    return this.unit.getHealth();
  }
}
