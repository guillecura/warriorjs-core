import RelativeDirections from '../../constants/RelativeDirections';
import Sense from './Sense';

class DirectionOfStairs extends Sense {
  _description = `Returns the direction (${Object.values(RelativeDirections).join(', ')}) the stairs are from your location.`;

  perform() {
    return this._unit.getPosition().getRelativeDirectionOfStairs();
  }
}

export default DirectionOfStairs;
