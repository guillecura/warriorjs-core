import { UNITS } from './constants/units';
import Floor from './Floor';

export default class LevelLoader {
  _level;

  constructor(level) {
    this._level = level;
  }

  load(config, warrior) {
    this._level.timeBonus = config.timeBonus;

    // Floor

    const { width, height } = config.size;
    this._level.floor = new Floor(width, height);
    const { x, y } = config.stairs;
    this._level.floor.placeStairs(x, y);

    // Warrior

    const abilities = Object.assign({}, config.warrior.abilities, warrior.abilities);
    this._placeWarrior(warrior.name, warrior.playerCode, config.warrior.x, config.warrior.y, config.warrior.facing, abilities);

    // Other units

    config.units.forEach((unit) => this._placeUnit(unit.type, unit.x, unit.y, unit.facing, unit.abilities));
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
