import RelativeDirections from '../constants/RelativeDirections';
import Base from './Base';

class Feel extends Base {
  _description = 'Returns a Space for the given direction (forward by default).';

  perform(direction = RelativeDirections.forward) {
    this.verifyDirection(direction);
    return this.getSpace(direction).getPlayerObject();
  }
}

export default Feel;
