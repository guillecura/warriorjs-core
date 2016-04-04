import Unit from './Unit';

export default class Ranged extends Unit {
  constructor() {
    super();
    this.addAbilities([
      {
        name: 'look',
        args: [],
      },
      {
        name: 'shoot',
        args: [],
      },
    ]);
  }

  _isPlayerWithinReach(turn, direction) {
    const unitSpace = turn.look(direction).find((space) => !space.isEmpty());
    return unitSpace && unitSpace.isPlayer();
  }
}
