import Actions from '../constants/Actions';
import Senses from '../constants/Senses';
import Base from './Base';

class Ranged extends Base {
  constructor() {
    super();

    this.addActions([Actions.shoot]);
    this.addSenses([Senses.look]);
  }

  isPlayerInSight(turn, direction) {
    const unit = turn.look(direction).find(space => !space.isEmpty());
    return unit && unit.isPlayer();
  }
}

export default Ranged;
