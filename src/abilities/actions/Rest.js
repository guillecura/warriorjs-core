import Action from './Action';

const HEALTH_GAIN = 0.1;

export default class Rest extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Gain ${HEALTH_GAIN * 100}% of max health back, but do nothing more.`;
  }

  perform() {
    if (this.unit.getHealth() < this.unit.maxHealth) {
      this.unit.say('rests');

      const amount = Math.round(this.unit.maxHealth * HEALTH_GAIN);
      this.unit.heal(amount);
    } else {
      this.unit.say('is already fit as a fiddle');
    }
  }
}
