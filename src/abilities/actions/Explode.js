import Action from './Action';

export default class Explode extends Action {
  _description = 'Kills you and all surrounding units. You probably don\'t want to do this intentionally.';
  _time;

  constructor(unit, time) {
    super(unit);
    this._time = time;
  }

  perform() {
    if (this._unit.isAlive()) {
      this._unit.say(`explodes, collapsing the ceiling and damaging every unit`);

      this._unit.position.floor.units.forEach((unit) => unit.takeDamage(100));
    }
  }

  passTurn() {
    if (this._time && this._unit.isAlive()) {
      this._unit.say('is ticking');
      this._time -= 1;
      if (this._time === 0) {
        this.perform();
      }
    }
  }
}
