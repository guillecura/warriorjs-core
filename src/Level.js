import Logger from './Logger';

export default class Level {
  constructor(description, tip, clue, timeBonus) {
    this.description = description;
    this.tip = tip;
    this.clue = clue;
    this.timeBonus = timeBonus;
    this.floor = null;
    this.warrior = null;
  }

  getClearBonus() {
    return this.floor.getOtherUnits().length === 0
      ? Math.round((this.warrior.score + this.timeBonus) * 0.2)
      : 0;
  }

  passed() {
    return this.floor.getStairsSpace().isWarrior();
  }

  failed() {
    return !this.floor.getUnits().includes(this.warrior);
  }

  play(turns) {
    Logger.clear();

    // eslint-disable-next-line
    for (let n = 0; n < turns; n++) {
      if (this.passed() || this.failed()) {
        break;
      }

      Logger.turn();

      this.floor.getUnits().forEach(unit => unit.prepareTurn());
      this.floor.getUnits().forEach(unit => unit.performTurn());

      if (this.timeBonus > 0) {
        this.timeBonus -= 1;
      }
    }

    return {
      events: Logger.events,
      passed: this.passed(),
      score: {
        warrior: this.warrior.score,
        timeBonus: this.timeBonus,
        clearBonus: this.getClearBonus(),
      },
    };
  }
}
