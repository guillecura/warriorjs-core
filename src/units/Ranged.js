import Shoot from '../abilities/actions/Shoot';
import Look from '../abilities/senses/Look';
import Unit from './Unit';

export default class Ranged extends Unit {
  constructor() {
    super();

    this.abilities.set('shoot', new Shoot(this));
    this.abilities.set('look', new Look(this));
  }

  _isPlayerWithinReach(turn, direction) {
    const unitSpace = turn.look(direction).find(space => !space.isEmpty());
    return unitSpace && unitSpace.isPlayer();
  }
}
