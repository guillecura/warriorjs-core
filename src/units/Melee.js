import Abilities from '../constants/Abilities';
import Unit from './Unit';

class Melee extends Unit {
  constructor() {
    super();

    this.addAbilities({
      [Abilities.attack]: [],
      [Abilities.feel]: [],
    });
  }

  isPlayerReachable(turn, direction) {
    return turn.feel(direction).isPlayer();
  }
}

export default Melee;
