import Floor from './Floor';
import Units from './units';
import UnitTypes from './constants/UnitTypes';

class LevelLoader {
  _level;
  _floor = new Floor();

  constructor(level) {
    this._level = level;
    this._level.setFloor(this._floor);
  }

  load(config, warrior) {
    this._level.setTimeBonus(config.timeBonus);

    this._floor.setWidth(config.size.width);
    this._floor.setHeight(config.size.height);
    this._floor.placeStairs(config.stairs.x, config.stairs.y);

    const abilities = Object.assign({}, config.warrior.abilities, warrior.abilities);
    this.placeWarrior(warrior.name, warrior.playerCode, config.warrior.x, config.warrior.y, config.warrior.facing, abilities);
    config.units.forEach((unit) => this.placeUnit(unit.type, unit.x, unit.y, unit.facing, unit.abilities));
  }

  placeUnit(type, x, y, facing, abilities = {}) {
    if (!Units.hasOwnProperty(type)) {
      throw new Error(`Unknown unit '${type}'.`);
    }

    const Unit = Units[type];

    const unit = new Unit();
    if (Object.keys(abilities).length) {
      unit.addAbilities(abilities);
    }

    this._floor.addUnit(unit, x, y, facing);
    return unit;
  }

  placeWarrior(name, playerCode, x, y, facing, abilities) {
    const warrior = this.placeUnit(UnitTypes.warrior, x, y, facing, abilities);
    warrior.setName(name);
    warrior.setPlayerCode(playerCode);
    this._level.setWarrior(warrior);
  }
}

export default LevelLoader;
