import RelativeDirections from '../../constants/RelativeDirections';
import Ability from '../Ability';

class DirectionOfStairs extends Ability {
  _description = `Returns the direction (${Object.values(RelativeDirections).join(', ')}) the stairs are from your location.`;

  perform() {
    return this._unit.getPosition().getRelativeDirectionOfStairs();
  }
}

export default DirectionOfStairs;
