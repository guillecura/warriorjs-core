import Ability from '../Ability';
import { originalSpaces } from '../../Space';

class DistanceOf extends Ability {
  _description = 'Pass a Space as an argument, and it will return an integer representing the distance to that space.';

  perform(space) {
    const originalSpace = space.isPlayerObject ? originalSpaces.get(space) : space;
    return this._unit.getPosition().getDistanceOf(originalSpace);
  }
}

export default DistanceOf;
