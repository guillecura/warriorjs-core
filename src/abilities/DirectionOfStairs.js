import RelativeDirections from '../constants/RelativeDirections';
import Base from './Base';

class DirectionOfStairs extends Base {
  _description = `Returns the direction (${Object.values(RelativeDirections).join(', ')}) the stairs are from your location.`;

  perform() {
    return this._unit.getPosition().getRelativeDirectionOfStairs();
  }
}

export default DirectionOfStairs;
