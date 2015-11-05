import RelativeDirections from '../constants/RelativeDirections';
import Base from './Base';

class Pivot extends Base {
  _description = 'Rotate left, right or backward (default).';

  perform(direction = RelativeDirections.backward) {
    this.verifyDirection(direction);
    this._unit.getPosition().rotate(direction);
    this._unit.say(`pivots ${direction}`);
  }
}

export default Pivot;
