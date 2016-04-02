import LevelLoader from './LevelLoader';
import Logger from './Logger';
import { TURN_CHANGED, FLOOR_CHANGED } from './constants/eventTypes';

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

  loadLevel(config, warrior) {
    new LevelLoader(this).load(config, warrior);
  }

  loadPlayer() {
    this.warrior.loadPlayer();
  }

  play(turns) {
    for (let n = 0; n < turns; n++) {
      if (this._passed() || this._failed()) break;

      Logger.log(TURN_CHANGED, { turn: n + 1 });

      this.floor.units.forEach((unit) => unit.prepareTurn());
      this.floor.units.forEach((unit) => { // eslint-disable-line no-loop-func
        unit.performTurn();

        const floor = this.floor.toViewObject();
        Logger.log(FLOOR_CHANGED, { floor });
      });

      if (this.timeBonus) this.timeBonus -= 1;
    }

    const events = Logger.events;
    Logger.clear();

    return {
      events,
      passed: this._passed(),
      score: {
        level: this.warrior.score,
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
}
