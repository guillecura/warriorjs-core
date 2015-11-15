import Sense from './Sense';

class Health extends Sense {
  _description = 'Returns an integer representing your health.';

  perform() {
    return this._unit.getHealth();
  }
}

export default Health;
