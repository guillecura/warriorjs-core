import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;
const RESCUING_BONUS = 20;

export default class Rescue extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Rescue a captive from his chains (earning ${RESCUING_BONUS} points) in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    if (this.unit.position.getRelativeSpace(direction).isBound()) {
      const recipient = this.unit.position.getRelativeSpace(direction).getUnit();

      this.unit.say(`unbinds ${direction} and rescues ${recipient}`);

      recipient.unbind();
      if (recipient.getType() === 'captive') {
        recipient.position = null;

        // TODO: Find a better way of logging the unit disappearance
        recipient.say();

        this.unit.earnPoints(RESCUING_BONUS);
      }
    } else {
      this.unit.say(`unbinds ${direction} and rescues nothing`);
    }
  }
}
