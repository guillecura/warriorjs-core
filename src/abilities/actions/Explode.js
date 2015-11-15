import Action from './Action';

class Explode extends Action {
  _description = 'Kills you and all surrounding units. You probably don\'t want to do this intentionally.';
  _time;

  constructor(unit, time) {
    super(unit);

    this._time = time;
  }

  perform() {
    if (this._unit.getPosition()) {
      this._unit.say(`explodes, collapsing the ceiling and damaging every unit.`);
      this._unit.getPosition().getFloor().getUnits().forEach((unit) => unit.takeDamage(100));
    }
  }

  passTurn() {
    if (this._time && this._unit.getPosition()) {
      this._unit.say('is ticking');
      this._time -= 1;
      if (this._time === 0) {
        this.perform();
      }
    }
  }
}

export default Explode;
