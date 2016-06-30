import { FORWARD } from '../../constants/directions';
import Action from './Action';

const DEFAULT_DIRECTION = FORWARD;
const RESCUING_BONUS = 20;

export default class Rescue extends Action {
  _description = `Rescue a captive from his chains (earning ${RESCUING_BONUS} points) in the` +
    `given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    if (this._getSpace(direction).isCaptive()) {
      const recipient = this._getUnit(direction);

      this._unit.say(`unbinds ${direction} and rescues ${recipient}`);

      recipient.unbind();
      if (recipient.type === 'captive') {
        recipient.position = null;

        this._unit.earnPoints(RESCUING_BONUS);
      }
    } else {
      this._unit.say(`unbinds ${direction} and rescues nothing`);
    }
  }
}
