import { RELATIVE_DIRECTION_ARRAY } from '../../constants/directions';
import Sense from './Sense';

export default class DirectionOfStairs extends Sense {
  constructor(unit) {
    super(unit);

    this.description = `Return the direction (${RELATIVE_DIRECTION_ARRAY.join(', ')}) the stairs are from your location.`;
  }

  perform() {
    return this.unit.position.getRelativeDirectionOfStairs();
  }
}
