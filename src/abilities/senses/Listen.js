import Sense from './Sense';

export default class Listen extends Sense {
  constructor(unit) {
    super(unit);

    this.description = 'Return an array of all spaces which have units in them.';
  }

  perform() {
    return this.unit.position.floor.units
      .filter(unit => unit !== this.unit)
      .map(unit => unit.position.getSpace().toPlayerObject());
  }
}
