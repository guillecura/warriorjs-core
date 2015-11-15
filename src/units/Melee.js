import Actions from '../constants/Actions';
import Senses from '../constants/Senses';
import Unit from './Unit';

class Melee extends Unit {
  constructor() {
    super();

    this.addActions([Actions.attack]);
    this.addSenses([Senses.feel]);
  }

  isPlayerReachable(turn, direction) {
    return turn.feel(direction).isPlayer();
  }
}

export default Melee;
