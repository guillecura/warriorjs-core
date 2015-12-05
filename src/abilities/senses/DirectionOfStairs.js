import { ORDERED_RELATIVE_DIRECTIONS } from '../../constants/relativeDirections';
import Sense from './Sense';

export default class DirectionOfStairs extends Sense {
  _description = `Return the direction (${ORDERED_RELATIVE_DIRECTIONS.join(', ')}) the stairs are from your location.`;

  perform() {
    return this._unit.position.getRelativeDirectionOfStairs();
  }
}
