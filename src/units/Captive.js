import UnitTypes from '../constants/UnitTypes';
import Base from './Base';

class Captive extends Base {
  _name = 'Captive';
  _type = UnitTypes.captive;
  _maxHealth = 1;

  constructor() {
    super();

    this.bind();
  }
}

export default Captive;
