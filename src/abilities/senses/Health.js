import Sense from './Sense';

export default class Health extends Sense {
  _description = 'Return an integer representing your health.';

  perform() {
    return this._unit.health;
  }
}
