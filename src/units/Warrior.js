/* eslint-disable no-eval */
import { transform } from 'babel-core';
import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import { DOING_NOTHING, EARNING_POINTS } from '../constants/states';
import Logger from '../Logger';
import Unit from './Unit';

export default class Warrior extends Unit {
  _name = null;
  _score = 0;
  _attackPower = 5;
  _shootPower = 3;
  _maxHealth = 20;
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

  get player() {
    return this._player;
  }

  loadPlayer(playerCode) {
    try {
      const options = { presets: [es2015, stage0] };
      const Player = eval(`
        (function () {
          ${transform(playerCode, options).code}
          return Player;
        })();
      `);
      this._player = new Player();
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error('Invalid submitted code. Check the syntax and try again.');
      }
    }
  }

  playTurn(turn) {
    this.player.playTurn(turn.toPlayerObject());
  }

  performTurn() {
    if (!this._currentTurn.action) {
      Logger.unit(this.toViewObject(), DOING_NOTHING, 'does nothing');
    }

    super.performTurn();
  }

  earnPoints(points) {
    this._score += points;

    Logger.unit(this.toViewObject(), EARNING_POINTS, `earns ${points} points`);
  }
}
