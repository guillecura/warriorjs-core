import Floor from './Floor';
import UnitTypes from './constants/UnitTypes';
import Archer from './units/Archer';
import Captive from './units/Captive';
import Sludge from './units/Sludge';
import ThickSludge from './units/ThickSludge';
import Warrior from './units/Warrior';
import Wizard from './units/Wizard';

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

    const actions = config.warrior.abilities.actions.concat(warrior.abilities.actions);
    const senses = config.warrior.abilities.senses.concat(warrior.abilities.senses);
    this.placeWarrior(warrior.name, warrior.playerCode, config.warrior.x, config.warrior.y, config.warrior.facing, actions, senses);

    config.units.forEach((unit) => {
      const newUnit = this.placeUnit(unit.type, unit.x, unit.y, unit.facing);

      if (unit.explode) {
        newUnit.addActions(['explode']);
        newUnit.getActions().explode.setTime(unit.explode);
      }
    });
  }

  placeUnit(type, x, y, facing, actions = [], senses = []) {
    let unit;
    if (type === UnitTypes.archer) {
      unit = new Archer();
    } else if (type === UnitTypes.captive) {
      unit = new Captive();
    } else if (type === UnitTypes.sludge) {
      unit = new Sludge();
    } else if (type === UnitTypes.thickSludge) {
      unit = new ThickSludge();
    } else if (type === UnitTypes.warrior) {
      unit = new Warrior();
    } else if (type === UnitTypes.wizard) {
      unit = new Wizard();
    } else {
      throw new Error(`Unknown unit type '${type}'.`);
    }

    this._floor.addUnit(unit, x, y, facing);
    if (actions.length) unit.addActions(actions);
    if (senses.length) unit.addSenses(senses);
    return unit;
  }

  placeWarrior(name, playerCode, x, y, facing, actions, senses) {
    const warrior = this.placeUnit(UnitTypes.warrior, x, y, facing, actions, senses);
    warrior.setName(name);
    warrior.setPlayerCode(playerCode);
    this._level.setWarrior(warrior);
  }
}

export default LevelLoader;
