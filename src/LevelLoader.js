import Attack from './abilities/actions/Attack';
import Bind from './abilities/actions/Bind';
import Detonate from './abilities/actions/Detonate';
import Explode from './abilities/actions/Explode';
import Pivot from './abilities/actions/Pivot';
import Rescue from './abilities/actions/Rescue';
import Rest from './abilities/actions/Rest';
import Shoot from './abilities/actions/Shoot';
import Walk from './abilities/actions/Walk';
import DirectionOf from './abilities/senses/DirectionOf';
import DirectionOfStairs from './abilities/senses/DirectionOfStairs';
import DistanceOf from './abilities/senses/DistanceOf';
import Feel from './abilities/senses/Feel';
import Health from './abilities/senses/Health';
import Listen from './abilities/senses/Listen';
import Look from './abilities/senses/Look';
import Archer from './units/Archer';
import Captive from './units/Captive';
import Sludge from './units/Sludge';
import ThickSludge from './units/ThickSludge';
import Warrior from './units/Warrior';
import Wizard from './units/Wizard';
import Floor from './Floor';

const UNITS = {
  archer: Archer,
  captive: Captive,
  sludge: Sludge,
  thickSludge: ThickSludge,
  warrior: Warrior,
  wizard: Wizard,
};

const ABILITIES = {
  attack: Attack,
  bind: Bind,
  detonate: Detonate,
  directionOf: DirectionOf,
  directionOfStairs: DirectionOfStairs,
  distanceOf: DistanceOf,
  explode: Explode,
  feel: Feel,
  health: Health,
  listen: Listen,
  look: Look,
  pivot: Pivot,
  rescue: Rescue,
  rest: Rest,
  shoot: Shoot,
  walk: Walk,
};

export default class LevelLoader {
  _level;

  constructor(level) {
    this._level = level;
  }

  load(levelConfig, warriorName) {
    this._level.timeBonus = levelConfig.timeBonus;

    const { size, stairs, units } = levelConfig.floor;

    this._setFloor(size, stairs);

    units.forEach(({ id, type, position, abilities }) => {
      const unit = this._placeUnit(id, type, position, abilities);
      if (unit.type === 'warrior') {
        unit.name = warriorName;
        this._level.warrior = unit;
      }
    });
  }

  _setFloor(size, stairs) {
    const { width, height } = size;
    this._level.floor = new Floor(width, height);

    const { x, y } = stairs;
    this._level.floor.placeStairs(x, y);
  }

  _placeUnit(id, type, position, abilities = []) {
    if (!(type in UNITS)) {
      throw new Error(`Unknown unit '${type}'.`);
    }

    const unit = new UNITS[type](id);

    abilities.forEach(({ name, args }) => {
      if (!(name in ABILITIES)) {
        throw new Error(`Unknown ability '${name}'.`);
      }

      const ability = new ABILITIES[name](unit, ...args);
      unit.abilities.set(name, ability);
    });

    this._level.floor.addUnit(unit, position);

    return unit;
  }
}
