import Unit from './Unit';

export default class Melee extends Unit {
  constructor() {
    super();
    this.addAbilities([
      {
        name: 'attack',
        args: [],
      },
      {
        name: 'feel',
        args: [],
      },
    ]);
  }

  _isPlayerWithinReach(turn, direction) {
    return turn.feel(direction).isPlayer();
  }
}
