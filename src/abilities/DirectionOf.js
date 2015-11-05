import RelativeDirections from '../constants/RelativeDirections';
import Base from './Base';
import { originalSpaces } from '../Space';

class DirectionOf extends Base {
  _description = `Pass a Space as an argument, and the direction (${Object.values(RelativeDirections).join(', ')}) to that space will be returned.`;

  perform(space) {
    const originalSpace = space.isPlayerObject ? originalSpaces.get(space) : space;
    return this._unit.getPosition().getRelativeDirectionOf(originalSpace);
  }
}

export default DirectionOf;
