import { ORIGINAL_OBJECT } from '../../decorators/playerObject';
import { RELATIVE_DIRECTION_ARRAY } from '../../constants/directions';
import Sense from './Sense';

export default class DirectionOf extends Sense {
  constructor(unit) {
    super(unit);

    this.description = `Pass a Space as an argument, and the direction (${RELATIVE_DIRECTION_ARRAY.join(', ')}) to that space will be returned.`;
  }

  perform(space) {
    const originalSpace = space[ORIGINAL_OBJECT] || space;
    return this.unit.position.getRelativeDirectionOf(originalSpace);
  }
}
