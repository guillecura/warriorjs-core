import UnitTypes from '../constants/UnitTypes';
import Sludge from './Sludge';

class ThickSludge extends Sludge {
  _name = 'Thick Sludge';
  _type = UnitTypes.thickSludge;
  _maxHealth = 24;
}

export default ThickSludge;
