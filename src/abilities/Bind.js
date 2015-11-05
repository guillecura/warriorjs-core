import RelativeDirections from '../constants/RelativeDirections';
import Base from './Base';

class Bind extends Base {
  _description = 'Binds a unit in given direction to keep him from moving (forward by default).';

  perform(direction = RelativeDirections.forward) {
    this.verifyDirection(direction);
    const receiver = this.getUnit(direction);
    if (receiver) {
      this._unit.say(`binds ${direction} and restricts ${receiver}`);
      receiver.bind();
    } else {
      this._unit.say(`binds ${direction} and restricts nothing`);
    }
  }
}

export default Bind;
