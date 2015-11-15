import { transform } from 'babel';
import UnitTypes from '../constants/UnitTypes';
import Unit from './Unit';

class Warrior extends Unit {
  _name = 'Warrior';
  _type = UnitTypes.warrior;
  _attackPower = 5;
  _shootPower = 3;
  _maxHealth = 20;
  _playerCode = null;
  _player = null;
  _score = 0;

  setName(name) {
    this._name = name || 'Warrior';
  }

  getPlayerCode() {
    return this._playerCode;
  }

  setPlayerCode(playerCode) {
    this._playerCode = playerCode;
  }

  getPlayer() {
    return this._player;
  }

  getScore() {
    return this._score;
  }

  loadPlayer() {
    const Player = eval(`(() => { ${transform(this.getPlayerCode(), { stage: 0 }).code} return Player; })()`); // eslint-disable-line no-eval
    this._player = new Player();
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
