import Unit from './Unit';

export default class Melee extends Unit {
  constructor() {
    super();
    this.addAbilities({
      attack: [],
      feel: [],
    });
  }

  _isPlayerWithinReach(turn, direction) {
    return turn.feel(direction).isPlayer();
  }
}
