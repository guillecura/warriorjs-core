import { RELATIVE_DIRECTION_ARRAY } from '../../constants/directions';
import Sense from './Sense';

export default class DirectionOfStairs extends Sense {
  _description = `Return the direction (${RELATIVE_DIRECTION_ARRAY.join(', ')}) the stairs are ` +
    'from your location.';

  perform() {
    return this._unit.position.getRelativeDirectionOfStairs();
  }
}
