import { ORDERED_RELATIVE_DIRECTIONS } from '../../constants/relativeDirections';
import { originalObject } from '../../decorators/playerObject';
import Sense from './Sense';

export default class DirectionOf extends Sense {
  _description = `Pass a Space as an argument, and the direction (${ORDERED_RELATIVE_DIRECTIONS.join(', ')}) to that space will be returned.`;

  perform(space) {
    const originalSpace = space[originalObject] || space;
    return this._unit.position.getRelativeDirectionOf(originalSpace);
  }
}
