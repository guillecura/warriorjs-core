import UnitTypes from '../constants/UnitTypes';
import Archer from './Archer';
import Captive from './Captive';
import Sludge from './Sludge';
import ThickSludge from './ThickSludge';
import Warrior from './Warrior';
import Wizard from './Wizard';

export default {
  [UnitTypes.archer]: Archer,
  [UnitTypes.captive]: Captive,
  [UnitTypes.sludge]: Sludge,
  [UnitTypes.thickSludge]: ThickSludge,
  [UnitTypes.warrior]: Warrior,
  [UnitTypes.wizard]: Wizard,
};
