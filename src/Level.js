import { isEqual } from 'lodash';

import LevelLoader from './LevelLoader';
import Logger from './Logger';

export default class Level {
  constructor() {
    this.warrior = null;
    this.floor = null;
    this.timeBonus = 0;
  }

  getClearBonus() {
    return !this.floor.getOtherUnits().length
      ? Math.round((this.warrior.score + this.timeBonus) * 0.2)
      : 0;
  }

  loadPlayer(playerCode) {
    this.warrior.loadPlayer(playerCode);
  }

  play(turns) {
    Logger.clear();

    const initialFloor = this.floor.toViewObject();
    Logger.playStarted(initialFloor);

    let lastFloor = initialFloor;

    // eslint-disable-next-line
    for (let n = 0; n < turns; n++) {
      if (this.passed() || this.failed()) {
        break;
      }

      const turnNumber = n + 1;
      Logger.turnChanged(turnNumber);

      this.floor.getUnits().forEach(unit => unit.prepareTurn());
      // eslint-disable-next-line
      this.floor.getUnits().forEach(unit => {
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
      passed: this.passed(),
      score: {
        warrior: this.warrior.score,
        timeBonus: this.timeBonus,
        clearBonus: this.getClearBonus(),
      },
      events: Logger.events,
    };
  }

  passed() {
    return this.floor.getStairsSpace().isWarrior();
  }

  failed() {
    return !this.floor.getUnits().includes(this.warrior);
  }

  static load(levelConfig) {
    const level = new Level();
    new LevelLoader(level).load(levelConfig);
    return level;
  }
}
