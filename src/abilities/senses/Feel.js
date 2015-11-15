import RelativeDirections from '../../constants/RelativeDirections';
import Ability from '../Ability';

class Feel extends Ability {
  _description = 'Returns a Space for the given direction (forward by default).';

  perform(direction = RelativeDirections.forward) {
    this.verifyDirection(direction);
    return this.getSpace(direction).getPlayerObject();
  }
}

export default Feel;
