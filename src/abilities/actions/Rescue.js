import { FORWARD } from '../../constants/directions';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;
const RESCUING_BONUS = 20;

export default class Rescue extends Action {
  constructor(unit) {
    super(unit);

    this.description = `Rescue a captive from his chains (earning ${RESCUING_BONUS} points) in the given direction (${DEFAULT_DIRECTION} by default).`;
  }

  perform(direction = DEFAULT_DIRECTION) {
    this.verifyDirection(direction);

    if (this.getSpace(direction).isCaptive()) {
      const recipient = this.getUnit(direction);

      Logger.unit(this.unit, `unbinds ${direction} and rescues ${recipient}`);

      recipient.unbind();
      if (recipient.getType() === 'captive') {
        recipient.position = null;

        Logger.unit(recipient);

        this.unit.earnPoints(RESCUING_BONUS);
      }
    } else {
      Logger.unit(this.unit, `unbinds ${direction} and rescues nothing`);
    }
  }
}
