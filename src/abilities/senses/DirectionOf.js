import RelativeDirections from '../../constants/RelativeDirections';
import Sense from './Sense';
import { originalSpaces } from '../../Space';

class DirectionOf extends Sense {
  _description = `Pass a Space as an argument, and the direction (${Object.values(RelativeDirections).join(', ')}) to that space will be returned.`;

  perform(space) {
    const originalSpace = space.isPlayerObject ? originalSpaces.get(space) : space;
    return this._unit.getPosition().getRelativeDirectionOf(originalSpace);
  }
}

export default DirectionOf;
