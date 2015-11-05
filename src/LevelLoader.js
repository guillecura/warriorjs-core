import Floor from './Floor';
import Units from './constants/Units';
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

  load(levelConfig) {
    this._level.setTimeBonus(levelConfig.timeBonus);

    this._floor.setWidth(levelConfig.size.width);
    this._floor.setHeight(levelConfig.size.height);
    this._floor.placeStairs(levelConfig.stairs.x, levelConfig.stairs.y);

    this.placeWarrior(levelConfig.warrior.x, levelConfig.warrior.y, levelConfig.warrior.facing, levelConfig.warrior.abilities.actions, levelConfig.warrior.abilities.senses);

    levelConfig.units.forEach((unit) => {
      const newUnit = this.placeUnit(unit.type, unit.x, unit.y, unit.facing);

      if (unit.explode) {
        newUnit.addActions(['explode']);
        newUnit.getActions().explode.setTime(unit.explode);
      }
    });
  }

  placeUnit(type, x, y, facing, actions, senses) {
    let unit;
    if (type === Units.archer) {
      unit = new Archer();
    } else if (type === Units.captive) {
      unit = new Captive();
    } else if (type === Units.sludge) {
      unit = new Sludge();
    } else if (type === Units.thickSludge) {
      unit = new ThickSludge();
    } else if (type === Units.warrior) {
      unit = new Warrior();
    } else if (type === Units.wizard) {
      unit = new Wizard();
    } else {
      throw new Error(`Unknown unit type '${type}'`);
    }

    this._floor.addUnit(unit, x, y, facing);

    if (actions) unit.addActions(actions);
    if (senses) unit.addSenses(senses);

    return unit;
  }

  placeWarrior(x, y, facing, actions, senses) {
    const warrior = this.placeUnit(Units.warrior, x, y, facing, actions, senses);
    this._level.setWarrior(warrior);
  }
}

export default LevelLoader;
