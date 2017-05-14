import Floor from './Floor';
import Level from './Level';
import Unit from './Unit';

export default function loadTower(tower) {
  function loadAbility(name, unit, args) {
    if (!(name in tower.abilities)) {
      throw new Error(`Unknown ability: '${name}'.`);
    }

    return tower.abilities[name](unit, args);
  }

  function loadEffect(name, unit, args) {
    if (!(name in tower.effects)) {
      throw new Error(`Unknown effect: '${name}'.`);
    }

    return tower.effects[name](unit, args);
  }

  function loadUnit(type, levelAbilities, levelEffects) {
    if (!(type in tower.units)) {
      throw new Error(`Unknown unit type: '${type}'.`);
    }

    const { maxHealth, bound, abilities, effects, playTurn } = tower.units[type];
    const unit = new Unit(type, maxHealth, bound);

    Object.entries({
      ...abilities,
      ...levelAbilities,
    }).forEach(([name, args]) => {
      const ability = loadAbility(name, unit, args);
      unit.addAbility(name, ability);
    });

    Object.entries({
      ...effects,
      ...levelEffects,
    }).forEach(([name, args]) => {
      const effect = loadEffect(name, unit, args);
      unit.addEffect(name, effect);
    });

    unit.playTurn = playTurn;

    return unit;
  }

  function loadLevel(levelConfig) {
    const { description, tip, clue, timeBonus, floor: { size, stairs, units } } = levelConfig;

    const level = new Level(description, tip, clue, timeBonus);

    level.floor = new Floor(size, stairs);

    units.forEach(({ type, position, abilities, effects }) => {
      const unit = loadUnit(type, abilities, effects);

      if (type === 'Warrior') {
        level.warrior = unit;
      }

      level.floor.addUnit(unit, position);
    });

    return level;
  }

  function loadPlayer(playerCode) {
    try {
      // eslint-disable-next-line
      const Player = eval(
        `
          (() => {
            ${playerCode}
            return Player;
          })();
        `,
      );
      return new Player();
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error('Invalid player code. Check the syntax and try again.');
      }

      throw new Error(`Invalid player code: ${err.message}.`);
    }
  }

  function runLevel(levelNumber, warriorName, playerCode) {
    const level = loadLevel(tower.levels[levelNumber - 1]);
    const player = loadPlayer(playerCode);
    level.warrior.name = warriorName;
    level.warrior.playTurn = player.playTurn;
    return level.play(1000);
  }

  return {
    runLevel,
  };
}
