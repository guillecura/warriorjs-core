import Attack from '../abilities/actions/Attack';
import Feel from '../abilities/senses/Feel';
import Unit from './Unit';

export default class Melee extends Unit {
  constructor(index) {
    super(index);

    this.addAbility(new Attack(this));
    this.addAbility(new Feel(this));
  }

  // eslint-disable-next-line
  isPlayerWithinReach(turn, direction) {
    return turn.feel(direction).isPlayer();
  }
}
