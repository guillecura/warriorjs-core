/* eslint-disable no-loop-func */
import isEqual from 'lodash.isequal';
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

    const initialFloor = this.floor.toViewObject();
    Logger.playStarted(initialFloor);

    let lastFloor = initialFloor;
    for (let n = 0; n < turns; n++) {
      if (this._passed() || this._failed()) {
        break;
      }

      const turnNumber = n + 1;
      Logger.turnChanged(turnNumber);

      this.floor.units.forEach(unit => unit.prepareTurn());
      this.floor.units.forEach((unit) => {
        unit.performTurn();

        const floor = this.floor.toViewObject();
        if (!isEqual(lastFloor, floor)) {
          Logger.floorChanged(floor);
        }

        lastFloor = floor;
      });

      if (this.timeBonus) {
        this.timeBonus -= 1;
      }
    }

    return {
      passed: this._passed(),
      score: {
        level: this.warrior.score,
        timeBonus: this.timeBonus,
        clearBonus: this.clearBonus,
      },
      events: Logger.events,
    };
  }

  _passed() {
    return this.floor.stairsSpace.isWarrior();
  }

  _failed() {
    return !this.floor.units.includes(this.warrior);
  }

  static load(levelConfig) {
    const level = new Level();
    new LevelLoader(level).load(levelConfig);
    return level;
  }
}
