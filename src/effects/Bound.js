import Effect from './Effect';

export default class Bound extends Effect {
  constructor(unit) {
    super(unit);

    this.description = 'Keeps you from moving.';
  }
}
