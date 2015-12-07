import { UNITS } from './constants/units';
import Floor from './Floor';

export default class LevelLoader {
  _level;

  constructor(level) {
    this._level = level;
  }

  load(config, profile) {
    this._level.timeBonus = config.timeBonus;

    const { width, height } = config.floor.size;
    this._level.floor = new Floor(width, height);

    const { x, y } = config.floor.stairs;
    this._level.floor.placeStairs(x, y);

    config.floor.units.forEach((unit) => {
      if (unit.type === 'warrior') {
        const { warriorName, playerCode } = profile;
        const abilities = Object.assign({}, unit.abilities, profile.abilities);
        this._placeWarrior(warriorName, playerCode, unit.x, unit.y, unit.facing, abilities);
      } else {
        this._placeUnit(unit.type, unit.x, unit.y, unit.facing, unit.abilities);
      }
    });
  }

  _placeUnit(type, x, y, facing, abilities = {}) {
    if (!(type in UNITS)) {
      throw new Error(`Unknown unit '${type}'.`);
    }

    const unit = new UNITS[type]();
    unit.addAbilities(abilities);
    this._level.floor.addUnit(unit, x, y, facing);
    return unit;
  }

  _placeWarrior(name, playerCode, x, y, facing, abilities) {
    const warrior = this._placeUnit('warrior', x, y, facing, abilities);
    warrior.name = name;
    warrior.playerCode = playerCode;
    this._level.warrior = warrior;
  }
}
