import { transform } from 'babel-core';
import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import Unit from './Unit';

export default class Warrior extends Unit {
  _name = null;
  _score = 0;
  _attackPower = 5;
  _shootPower = 3;
  _maxHealth = 20;
  _playerCode = null;
  _player = null;

  get name() {
    return this._name || 'Warrior';
  }

  set name(name) {
    this._name = name;
  }

  get score() {
    return this._score;
  }

  get playerCode() {
    return this._playerCode;
  }

  set playerCode(playerCode) {
    this._playerCode = playerCode;
  }

  get player() {
    return this._player;
  }

  loadPlayer() {
    const options = { presets: [es2015, stage0] };
    const Player = eval(`
      (function() {
        ${transform(this.playerCode, options).code}
        return Player;
      })();
    `);
    this._player = new Player();
  }

  playTurn(turn) {
    this.player.playTurn(turn.toPlayerObject());
  }

  performTurn() {
    if (!this._currentTurn.action) {
      this.say('does nothing');
    }

    super.performTurn();
  }

  earnPoints(points) {
    this._score += points;

    this.say(`earns ${points} points`);
  }
}
