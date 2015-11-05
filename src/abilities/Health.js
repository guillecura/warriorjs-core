import Base from './Base';

class Health extends Base {
  _description = 'Returns an integer representing your health.';

  perform() {
    return this._unit.getHealth();
  }
}

export default Health;
