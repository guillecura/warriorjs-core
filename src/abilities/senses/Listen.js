import Sense from './Sense';

export default class Listen extends Sense {
  _description = 'Return an array of all spaces which have units in them.';

  perform() {
    return [...this._unit.position.floor.units.values()]
      .filter(unit => unit !== this._unit)
      .map(unit => unit.position.space.toPlayerObject());
  }
}
