import { UNITS } from './constants/units';
import Floor from './Floor';

export default class LevelLoader {
  _level;

  constructor(level) {
    this._level = level;
  }

  load(levelConfig, profile) {
    this._level.timeBonus = levelConfig.timeBonus;

    const { warrior, size, stairs } = levelConfig.floor;

    this._setFloor(size, stairs);

    const { warriorName, playerCode } = profile;
    const { x, y, facing } = warrior;
    const newAbilities = warrior.abilities || [];
    const abilities = [...newAbilities, ...profile.abilities];
    this._placeWarrior(warriorName, playerCode, x, y, facing, abilities);

    levelConfig.floor.units.forEach((unit) => {
      this._placeUnit(unit.type, unit.x, unit.y, unit.facing, unit.abilities);
    });
  }

  _setFloor(size, stairs) {
    const { width, height } = size;
    this._level.floor = new Floor(width, height);

    const { x, y } = stairs;
    this._level.floor.placeStairs(x, y);
  }

  _placeWarrior(name, playerCode, x, y, facing, abilities) {
    const warrior = this._placeUnit('warrior', x, y, facing, abilities);
    warrior.name = name;
    warrior.playerCode = playerCode;
    this._level.warrior = warrior;
  }

  _placeUnit(type, x, y, facing, abilities = []) {
    if (!(type in UNITS)) {
      throw new Error(`Unknown unit '${type}'.`);
    }

    const unit = new UNITS[type]();
    unit.addAbilities(abilities);
    this._level.floor.addUnit(unit, x, y, facing);
    return unit;
  }
}
