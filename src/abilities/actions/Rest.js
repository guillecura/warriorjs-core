import Action from './Action';
import Logger from '../../Logger';

const HEALTH_GAIN = 0.1;

export default class Rest extends Action {
  _description = `Gain ${HEALTH_GAIN * 100}% of max health back, but do nothing more.`;

  perform() {
    if (this._unit.health < this._unit.maxHealth) {
      const amount = Math.round(this._unit.maxHealth * HEALTH_GAIN);
      const revisedAmount = this._unit.health + amount > this._unit.maxHealth ?
        this._unit.maxHealth - this._unit.health :
        amount;

      this._unit.health += revisedAmount;

      Logger.unit(this._unit.toViewObject(),
        `receives ${revisedAmount} health from resting, up to ${this._unit.health} health`
      );
    } else {
      Logger.unit(this._unit.toViewObject(), 'is already fit as a fiddle');
    }
  }
}
