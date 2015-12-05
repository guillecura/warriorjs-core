import Ability from '../Ability';

export default class Action extends Ability {
  _damage(receiver, amount) {
    receiver.takeDamage(amount);
    if (!receiver.isAlive()) {
      this._unit.earnPoints(receiver.maxHealth);
    }
  }
}
