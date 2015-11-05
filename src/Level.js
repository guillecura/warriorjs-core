import LevelLoader from './LevelLoader';

class Level {
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

  loadLevel(config) {
    new LevelLoader(this).load(config);
  }

  setupWarrior(warriorName, actions, senses) {
    this._warrior.setName(warriorName);
    this._warrior.addActions(actions);
    this._warrior.addSenses(senses);
  }

  passed() {
    return this.getFloor().getStairsSpace().isWarrior();
  }

  failed() {
    return !this.getFloor().getUnits().includes(this.getWarrior());
  }

  play(turns = 1000) {
    for (let n = 0; n < turns; n++) {
      if (this.passed() || this.failed()) return;
      this.getFloor().getUnits().forEach(unit => unit.prepareTurn());
      this.getFloor().getUnits().forEach(unit => unit.performTurn());
      if (this.getTimeBonus()) this._timeBonus -= 1;
    }
  }
}

export default Level;
