import { EXPLODING, TICKING } from '../../constants/states';
import Action from './Action';
import Logger from '../../Logger';

export default class Explode extends Action {
  _description = 'Kills you and all surrounding units. You probably don\'t want to do this' +
    'intentionally.';
  _time;

  constructor(unit, time) {
    super(unit);
    this._time = time;
  }

  perform() {
    if (this._unit.isAlive()) {
      Logger.unit(
        this._unit.toViewObject(),
        EXPLODING,
        'explodes, collapsing the ceiling and killing every unit',
      );

      this._unit.position.floor.units.forEach(unit => unit.takeDamage(Infinity));
    }
  }

  passTurn() {
    if (this._time && this._unit.isAlive()) {
      Logger.unit(this._unit.toViewObject(), TICKING, 'is ticking');

      this._time -= 1;
      if (!this._time) {
        this.perform();
      }
    }
  }
}
