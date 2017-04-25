import Archer from './units/Archer';
import Attack from './abilities/actions/Attack';
import Bind from './abilities/actions/Bind';
import Captive from './units/Captive';
import Detonate from './abilities/actions/Detonate';
import DirectionOf from './abilities/senses/DirectionOf';
import DirectionOfStairs from './abilities/senses/DirectionOfStairs';
import DistanceOf from './abilities/senses/DistanceOf';
import Explode from './abilities/actions/Explode';
import Feel from './abilities/senses/Feel';
import Floor from './Floor';
import Health from './abilities/senses/Health';
import Listen from './abilities/senses/Listen';
import Look from './abilities/senses/Look';
import Pivot from './abilities/actions/Pivot';
import Rescue from './abilities/actions/Rescue';
import Rest from './abilities/actions/Rest';
import Shoot from './abilities/actions/Shoot';
import Sludge from './units/Sludge';
import ThickSludge from './units/ThickSludge';
import Walk from './abilities/actions/Walk';
import Warrior from './units/Warrior';
import Wizard from './units/Wizard';

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

  load(levelConfig) {
    this._level.timeBonus = levelConfig.timeBonus;

    const { size, stairs, warrior, units } = levelConfig.floor;

    this._setFloor(size, stairs);

    const { name, x, y, facing, abilities } = warrior;
    this._placeWarrior(name, x, y, facing, abilities);

    units.forEach(unit => this._placeUnit(unit.type, unit.x, unit.y, unit.facing, unit.abilities));
  }

  _setFloor(size, stairs) {
    const { width, height } = size;
    this._level.floor = new Floor(width, height);

    const { x, y } = stairs;
    this._level.floor.placeStairs(x, y);
  }

  _placeWarrior(name, x, y, facing, abilities) {
    const warrior = this._placeUnit('warrior', x, y, facing, abilities);
    warrior.name = name;
    this._level.warrior = warrior;
  }

  _placeUnit(type, x, y, facing, abilities = []) {
    if (!(type in UNITS)) {
      throw new Error(`Unknown unit '${type}'.`);
    }

    const unit = new UNITS[type]();

    abilities.forEach(({ name, args }) => {
      if (!(name in ABILITIES)) {
        throw new Error(`Unknown ability '${name}'.`);
      }

      unit.abilities[name] = new ABILITIES[name](unit, ...args);
    });

    this._level.floor.addUnit(unit, x, y, facing);

    return unit;
  }
}
