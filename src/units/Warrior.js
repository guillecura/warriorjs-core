import Base from './Base';

class Warrior extends Base {
  _name = 'Warrior';
  _attackPower = 5;
  _shootPower = 3;
  _maxHealth = 20;
  _score = 0;

  getName() {
    return this._name || 'Warrior';
  }

  setName(name) {
    this._name = name;
  }

  getScore() {
    return this._score;
  }

  getPlayer() {
    this._player = this._player || new global.Player();
    return this._player;
  }

  playTurn(turn) {
    this.getPlayer().playTurn(turn.getPlayerObject());
  }

  performTurn() {
    if (!this._currentTurn.getAction()) {
      this.say('does nothing');
    }

    super.performTurn();
  }

  earnPoints(points) {
    this._score += points;
    this.say(`earns ${points} points`);
  }
}

export default Warrior;
