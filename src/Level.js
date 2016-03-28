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

  loadLevel(config, warrior) {
    new LevelLoader(this).load(config, warrior);
  }

  loadPlayer() {
    this.warrior.loadPlayer();
  }

  play(turns) {
    const initialFloor = this.floor.toViewObject();
    const trace = [
      [{ floor: initialFloor, log: [] }],
    ];

    for (let n = 0; n < turns; n++) {
      if (this._passed() || this._failed()) break;

      const steps = [];

      this.floor.units.forEach((unit) => unit.prepareTurn());
      this.floor.units.forEach((unit) => { // eslint-disable-line no-loop-func
        unit.performTurn();

        const floor = this.floor.toViewObject();

        const log = Logger.entries;
        Logger.clear();

        steps.push({ floor, log });
      });

      if (this.timeBonus) this.timeBonus -= 1;

      trace.push(steps);
    }

    return {
      trace,
      passed: this._passed(),
      points: {
        levelScore: this.warrior.score,
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
