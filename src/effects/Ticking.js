import Effect from './Effect';
import Logger from '../Logger';

export default class Ticking extends Effect {
  constructor(unit, time) {
    super(unit, time);

    this.description = 'Kills you and all surrounding units when time reaches zero.';
  }

  activate() {
    Logger.unit(this.unit, 'is ticking');

    if (!this.time) {
      this.explode();
    }
  }

  explode() {
    Logger.unit(this.unit, 'explodes, collapsing the ceiling and killing every unit');

    const units = this.unit.position.floor.getUnits();
    units.forEach(unit => unit.takeDamage(Number.MAX_SAFE_INTEGER));
  }
}
