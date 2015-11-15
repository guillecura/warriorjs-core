import RelativeDirections from '../../constants/RelativeDirections';
import Sense from './Sense';

class Look extends Sense {
  _description = 'Returns an array of up to three Spaces in the given direction (forward by default).';

  perform(direction = RelativeDirections.forward) {
    this.verifyDirection(direction);
    return [1, 2, 3].map(amount => this.getSpace(direction, amount).getPlayerObject());
  }
}

export default Look;
