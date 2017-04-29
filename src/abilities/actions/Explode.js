import Action from './Action';
import Logger from '../../Logger';

export default class Explode extends Action {
  constructor(unit, time) {
    super(unit);

    this.time = time;

    this.description =
      "Kills you and all surrounding units. You probably don't want to do this intentionally.";
  }

  perform() {
    if (this.unit.isAlive()) {
      Logger.unit(
        this.unit,
        'exploding',
        'explodes, collapsing the ceiling and killing every unit',
      );

      this.unit.position.floor.getUnits().forEach(unit => unit.takeDamage(Number.MAX_SAFE_INTEGER));
    }
  }

  passTurn() {
    if (this.time && this.unit.isAlive()) {
      Logger.unit(this.unit, null, 'is ticking');

      this.time -= 1;
      if (!this.time) {
        this.perform();
      }
    }
  }
}
