import { ORIGINAL_OBJECT } from '../../decorators/playerObject';
import Sense from './Sense';

export default class DistanceOf extends Sense {
  constructor(unit) {
    super(unit);

    this.description =
      'Pass a Space as an argument, and it will return an integer representing the distance to that space.';
  }

  perform(space) {
    const originalSpace = space[ORIGINAL_OBJECT] || space;
    return this.unit.position.getDistanceOf(originalSpace);
  }
}
