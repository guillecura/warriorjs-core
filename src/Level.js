/* eslint-disable no-loop-func */
import LevelLoader from './LevelLoader';
import Logger from './Logger';

export default class Level {
  _warrior = null;
  _floor = null;
  _timeBonus = 0;

  get warrior() {
    return this._warrior;
  }

  set warrior(warrior) {
    this._warrior = warrior;
  }

  get floor() {
    return this._floor;
  }

  set floor(floor) {
    this._floor = floor;
  }

  get timeBonus() {
    return this._timeBonus;
  }

  set timeBonus(timeBonus) {
    this._timeBonus = timeBonus;
  }

  get clearBonus() {
    return !this.floor.otherUnits.length ?
      Math.round((this.warrior.score + this.timeBonus) * 0.2) :
      0;
  }

  loadPlayer(playerCode) {
    this.warrior.loadPlayer(playerCode);
  }

  play(turns) {
    Logger.clear();

    for (let n = 0; n < turns; n++) {
      if (this._passed() || this._failed()) {
        break;
      }

      const turnNumber = n + 1;
      Logger.turn(turnNumber);

      this.floor.units.forEach(unit => unit.prepareTurn());
      this.floor.units.forEach(unit => unit.performTurn());

      if (this.timeBonus) {
        this.timeBonus -= 1;
      }
    }

    return {
      events: Logger.events,
      passed: this._passed(),
      score: {
        warrior: this.warrior.score,
        timeBonus: this.timeBonus,
        clearBonus: this.clearBonus,
      },
    };
  }

  _passed() {
    return this.floor.stairsSpace.isWarrior();
  }

  _failed() {
    return !this.floor.units.includes(this.warrior);
  }

  static load(levelConfig, warriorName) {
    const level = new Level();
    new LevelLoader(level).load(levelConfig, warriorName);
    return level;
  }
}
