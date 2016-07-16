import Attack from '../abilities/actions/Attack';
import Feel from '../abilities/senses/Feel';
import Unit from './Unit';

export default class Melee extends Unit {
  constructor() {
    super();

    this.abilities.set('attack', new Attack(this));
    this.abilities.set('feel', new Feel(this));
  }

  _isPlayerWithinReach(turn, direction) {
    return turn.feel(direction).isPlayer();
  }
}
