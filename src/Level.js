import LevelLoader from './LevelLoader';

const MAX_TURNS = 1000;

class Level {
  _warrior = null;
  _floor = null;
  _timeBonus = 0;

  getWarrior() {
    return this._warrior;
  }

  setWarrior(warrior) {
    this._warrior = warrior;
  }

  getFloor() {
    return this._floor;
  }

  setFloor(floor) {
    this._floor = floor;
  }

  getTimeBonus() {
    return this._timeBonus;
  }

  setTimeBonus(timeBonus) {
    this._timeBonus = timeBonus;
  }

  getClearBonus() {
    if (!this.getFloor().getOtherUnits().length) {
      return Math.round((this.getWarrior().getScore() + this.getTimeBonus()) * 0.2);
    }

    return 0;
  }

  loadLevel(config, warrior) {
    new LevelLoader(this).load(config, warrior);
  }

  loadPlayer() {
    this.getWarrior().loadPlayer();
  }

  passed() {
    return this.getFloor().getStairsSpace().isWarrior();
  }

  failed() {
    return !this.getFloor().getUnits().includes(this.getWarrior());
  }

  play(turns = MAX_TURNS) {
    const trace = [];
    for (let n = 0; n < turns; n++) {
      if (this.passed() || this.failed()) break;
      this.getFloor().getUnits().forEach((unit) => unit.prepareTurn());
      this.getFloor().getUnits().forEach((unit) => { // eslint-disable-line no-loop-func
        unit.performTurn();
        trace.push({
          floor: this.getFloor().toViewObject(),
          log: '',
        });
      });
      if (this.getTimeBonus()) this._timeBonus -= 1;
    }

    return {
      trace,
      passed: this.passed(),
      points: {
        levelScore: this.getWarrior().getScore(),
        timeBonus: this.getTimeBonus(),
        clearBonus: this.getClearBonus(),
      },
    };
  }
}

export default Level;
