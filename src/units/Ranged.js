import Abilities from '../constants/Abilities';
import Unit from './Unit';

class Ranged extends Unit {
  constructor() {
    super();

    this.addAbilities({
      [Abilities.look]: [],
      [Abilities.shoot]: [],
    });
  }

  isPlayerInSight(turn, direction) {
    const unit = turn.look(direction).find(space => !space.isEmpty());
    return unit && unit.isPlayer();
  }
}

export default Ranged;
