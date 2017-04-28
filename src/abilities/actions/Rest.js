import Action from './Action';

const HEALTH_GAIN = 0.1;

export default class Rest extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Gain ${HEALTH_GAIN * 100}% of max health back, but do nothing more.`;
  }

  perform() {
    if (this.unit.getHealth() < this.unit.maxHealth) {
      const amount = Math.round(this.unit.maxHealth * HEALTH_GAIN);
      const revisedAmount = this.unit.getHealth() + amount > this.unit.maxHealth
        ? this.unit.maxHealth - this.unit.getHealth()
        : amount;

      this.unit.health += revisedAmount;

      this.unit.say(
        `receives ${revisedAmount} health from resting, up to ${this.unit.getHealth()} health`,
      );
    } else {
      this.unit.say('is already fit as a fiddle');
    }
  }
}
