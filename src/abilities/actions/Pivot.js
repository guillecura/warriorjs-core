import RelativeDirections from '../../constants/RelativeDirections';
import Action from './Action';

const ROTATION_DIRECTIONS = [
  RelativeDirections.forward,
  RelativeDirections.right,
  RelativeDirections.backward,
  RelativeDirections.left,
];

class Pivot extends Action {
  _description = 'Rotate left, right or backward (default).';

  perform(direction = RelativeDirections.backward) {
    this.verifyDirection(direction);
    this._unit.getPosition().rotate(ROTATION_DIRECTIONS.indexOf(direction));
    this._unit.say(`pivots ${direction}`);
  }
}

export default Pivot;
