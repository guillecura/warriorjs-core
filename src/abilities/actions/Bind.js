import RelativeDirections from '../../constants/RelativeDirections';
import Action from './Action';

class Bind extends Action {
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
