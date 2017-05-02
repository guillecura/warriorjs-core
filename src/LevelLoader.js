import * as Abilities from './abilities';
import * as Effects from './effects';
import * as Units from './units';
import Floor from './Floor';

const UNITS = {
  archer: Units.Archer,
  captive: Units.Captive,
  sludge: Units.Sludge,
  thickSludge: Units.ThickSludge,
  warrior: Units.Warrior,
  wizard: Units.Wizard,
};

const ABILITIES = {
  attack: Abilities.Attack,
  bind: Abilities.Bind,
  detonate: Abilities.Detonate,
  directionOf: Abilities.DirectionOf,
  directionOfStairs: Abilities.DirectionOfStairs,
  distanceOf: Abilities.DistanceOf,
  feel: Abilities.Feel,
  health: Abilities.Health,
  listen: Abilities.Listen,
  look: Abilities.Look,
  pivot: Abilities.Pivot,
  rescue: Abilities.Rescue,
  rest: Abilities.Rest,
  shoot: Abilities.Shoot,
  walk: Abilities.Walk,
};

const EFFECTS = {
  bound: Effects.Bound,
  ticking: Effects.Ticking,
};

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
