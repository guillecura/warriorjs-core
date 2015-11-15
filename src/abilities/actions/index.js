import Actions from '../../constants/Actions';
import Attack from './Attack';
import Bind from './Bind';
import Detonate from './Detonate';
import Explode from './Explode';
import Pivot from './Pivot';
import Rescue from './Rescue';
import Rest from './Rest';
import Shoot from './Shoot';
import Walk from './Walk';

export default {
  [Actions.attack]: Attack,
  [Actions.bind]: Bind,
  [Actions.detonate]: Detonate,
  [Actions.explode]: Explode,
  [Actions.pivot]: Pivot,
  [Actions.rescue]: Rescue,
  [Actions.rest]: Rest,
  [Actions.shoot]: Shoot,
  [Actions.walk]: Walk,
}
