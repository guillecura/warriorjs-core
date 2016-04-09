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
