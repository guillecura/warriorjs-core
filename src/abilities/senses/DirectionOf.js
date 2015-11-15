import RelativeDirections from '../../constants/RelativeDirections';
import Ability from '../Ability';
import { originalSpaces } from '../../Space';

class DirectionOf extends Ability {
  _description = `Pass a Space as an argument, and the direction (${Object.values(RelativeDirections).join(', ')}) to that space will be returned.`;

  perform(space) {
    const originalSpace = space.isPlayerObject ? originalSpaces.get(space) : space;
    return this._unit.getPosition().getRelativeDirectionOf(originalSpace);
  }
}

export default DirectionOf;
