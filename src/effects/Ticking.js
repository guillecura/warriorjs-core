import Effect from './Effect';

export default class Ticking extends Effect {
  constructor(unit, time) {
    super(unit, time);

    this.description = 'Kills you and all surrounding units when time reaches zero.';
  }

  activate() {
    this.unit.say('is ticking');

    if (!this.time) {
      this.explode();
    }
  }

  explode() {
    this.unit.say('explodes, collapsing the ceiling and killing every unit');

    const units = this.unit.position.floor.getUnits();
    units.forEach(unit => unit.takeDamage(Number.MAX_SAFE_INTEGER));
  }
}
