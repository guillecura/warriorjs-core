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

const EFFECTS = {};

export default class LevelLoader {
  constructor(level) {
    this.level = level;
  }

  load(levelConfig, warriorName) {
    this.level.timeBonus = levelConfig.timeBonus;

    const { size, stairs, units } = levelConfig.floor;

    this.setFloor(size, stairs);

    if (units.filter(unit => unit.type === 'warrior').length !== 1) {
      throw new Error('One unit in the level must be a warrior.');
    }

    units.forEach(({ type, position, abilities, effects }, index) => {
      const unit = this.placeUnit(index, type, position, abilities, effects);
      if (type === 'warrior') {
        unit.name = warriorName;
        this.level.warrior = unit;
      }
    });
  }

  setFloor(size, stairs) {
    const { width, height } = size;
    this.level.floor = new Floor(width, height);

    const { x, y } = stairs;
    this.level.floor.placeStairs(x, y);
  }

  placeUnit(index, type, position, abilities = [], effects = []) {
    if (!(type in UNITS)) {
      throw new Error(`Unknown unit '${type}'.`);
    }

    const unit = new UNITS[type](index);

    abilities.forEach(({ name, args }) => {
      if (!(name in ABILITIES)) {
        throw new Error(`Unknown ability '${name}'.`);
      }

      unit.addAbility(new ABILITIES[name](unit, ...args));
    });

    effects.forEach(({ name, args }) => {
      if (!(name in EFFECTS)) {
        throw new Error(`Unknown effect '${name}'.`);
      }

      unit.addEffect(new EFFECTS[name](unit, ...args));
    });

    this.level.floor.addUnit(unit, position);

    return unit;
  }
}
