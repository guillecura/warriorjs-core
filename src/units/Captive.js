import UnitTypes from '../constants/UnitTypes';
import Unit from './Unit';

class Captive extends Unit {
  _name = 'Captive';
  _type = UnitTypes.captive;
  _maxHealth = 1;

  constructor() {
    super();

    this.bind();
  }
}

export default Captive;
