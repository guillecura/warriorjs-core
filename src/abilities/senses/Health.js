import Ability from '../Ability';

class Health extends Ability {
  _description = 'Returns an integer representing your health.';

  perform() {
    return this._unit.getHealth();
  }
}

export default Health;
