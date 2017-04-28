import Ability from '../Ability';

export default class Action extends Ability {
  damage(receiver, amount) {
    receiver.takeDamage(amount);
    if (!receiver.isAlive()) {
      this.unit.earnPoints(receiver.maxHealth);
    }
  }
}
