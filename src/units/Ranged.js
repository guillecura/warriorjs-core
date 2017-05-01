import Look from '../abilities/senses/Look';
import Shoot from '../abilities/actions/Shoot';
import Unit from './Unit';

export default class Ranged extends Unit {
  constructor(index) {
    super(index);

    this.addAbility(new Shoot(this));
    this.addAbility(new Look(this));
  }

  // eslint-disable-next-line
  isPlayerWithinReach(turn, direction) {
    const unitSpace = turn.look(direction).find(space => !space.isEmpty());
    return unitSpace && unitSpace.isPlayer();
  }
}
