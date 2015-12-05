import { originalObject } from '../../decorators/playerObject';
import Sense from './Sense';

export default class DistanceOf extends Sense {
  _description = 'Pass a Space as an argument, and it will return an integer representing the distance to that space.';

  perform(space) {
    const originalSpace = space[originalObject] || space;
    return this._unit.position.getDistanceOf(originalSpace);
  }
}
