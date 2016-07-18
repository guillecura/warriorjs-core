import { FORWARD } from '../../constants/directions';
import { RESCUING } from '../../constants/states';
import Action from './Action';
import Logger from '../../Logger';

const DEFAULT_DIRECTION = FORWARD;
const RESCUING_BONUS = 20;

export default class Rescue extends Action {
  _description = `Rescue a captive from his chains (earning ${RESCUING_BONUS} points) in the` +
    `given direction (${DEFAULT_DIRECTION} by default).`;

  perform(direction = DEFAULT_DIRECTION) {
    this._verifyDirection(direction);

    const state = this._getStateWithDirection(RESCUING, direction);

    if (this._getSpace(direction).isCaptive()) {
      const recipient = this._getUnit(direction);

      Logger.unit(
        this._unit.toViewObject(),
        state,
        `unbinds ${direction} and rescues ${recipient}`,
      );

      recipient.unbind();
      if (recipient.type === 'captive') {
        recipient.position = null;

        this._unit.earnPoints(RESCUING_BONUS);
      }
    } else {
      Logger.unit(this._unit.toViewObject(), state, `unbinds ${direction} and rescues nothing`);
    }
  }
}
