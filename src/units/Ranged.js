import Actions from '../constants/Actions';
import Senses from '../constants/Senses';
import Unit from './Unit';

class Ranged extends Unit {
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
