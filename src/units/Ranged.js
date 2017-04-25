import Look from '../abilities/senses/Look';
import Shoot from '../abilities/actions/Shoot';
import Unit from './Unit';

export default class Ranged extends Unit {
  constructor() {
    super();

    this.abilities.shoot = new Shoot(this);
    this.abilities.look = new Look(this);
  }

  // eslint-disable-next-line
  _isPlayerWithinReach(turn, direction) {
    const unitSpace = turn.look(direction).find(space => !space.isEmpty());
    return unitSpace && unitSpace.isPlayer();
  }
}
