import RelativeDirections from '../../constants/RelativeDirections';
import Ability from '../Ability';

class Rescue extends Ability {
  _description = 'Rescue a captive from his chains (earning 20 points) in given direction (forward by default).';

  perform(direction = RelativeDirections.forward) {
    this.verifyDirection(direction);
    if (this.getSpace(direction).isCaptive()) {
      const recipient = this.getUnit(direction);
      this._unit.say(`unbinds ${direction} and rescues ${recipient}`);
      recipient.unbind();
      if (recipient.constructor.name === 'Captive') {
        recipient.setPosition(null);
        this._unit.earnPoints(20);
      }
    } else {
      this._unit.say(`unbinds ${direction} and rescues nothing`);
    }
  }
}

export default Rescue;
