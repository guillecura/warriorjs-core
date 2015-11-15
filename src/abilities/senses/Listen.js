import Ability from '../Ability';

class Listen extends Ability {
  _description = 'Returns an array of all spaces which have units in them.';

  perform() {
    return this._unit.getPosition().getFloor().getUnits()
      .filter(unit => unit !== this._unit)
      .map(unit => unit.getPosition().getSpace().getPlayerObject());
  }
}

export default Listen;
