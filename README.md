# ![WarriorJS Core](https://cdn.rawgit.com/warriorjs/warriorjs-core/master/warriorjs-logo.svg)

[![Build Status](https://img.shields.io/travis/warriorjs/warriorjs-core/master.svg?style=flat-square)](https://travis-ci.org/warriorjs/warriorjs-core)
[![Codecov](https://img.shields.io/codecov/c/github/warriorjs/warriorjs-core.svg?style=flat-square)](https://codecov.io/gh/warriorjs/warriorjs-core)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

```bash
$ npm install --save warriorjs-core
```

## API Reference

The WarriorJS Core API exposes a single yet important function:

### `playLevel(levelConfig, playerCode, [maxTurns])`

Plays a WarriorJS level using the player's code.

#### Arguments

1. `levelConfig` *(Object)*: The configuration of the level, with the following members:
  * `timeBonus` *(Number)*: Amount of turns the player has to complete the level obtaining bonus points.
  * `floor` *(Object)*: The floor of the level, with the following members:
    * `size` *(Object)*: The size of the floor.
    * `stairs` *(Object)*: The position of the stairs.
    * `warrior` *(Object)*: The player's warrior.
    * `units` *(Array)*: The other units in the level.
2. `playerCode` *(String)*: The code written by the player.
3. `[maxTurns]` *(Number)*: The maximum number of turns that will be played.

#### Returns

*(Object)* An object containing the play result with the following members:
  * `passed` *(Boolean)*: Whether the level was passed or not.
  * `score` *(Object)*:
    * `warrior` *(Number)*: The points earned by the warrior by killing units and rescuing captives.
    * `timeBonus` *(Number)*: A bonus for completing the level in less than a specified amount of turns.
    * `clearBonus` *(Number)*: A bonus for defeating all enemies and rescuing all captives.
  * `events` *(Array)*: The sequence of events that took place during the play.

#### Example

```javascript
import playLevel from 'warriorjs-core';

const levelConfig = {
  timeBonus: 15,
  floor: {
    size: {
      width: 8,
      height: 1
    },
    stairs: {
      x: 7,
      y: 0
    },
    warrior: {
      name: 'Spartacus',
      x: 0,
      y: 0,
      facing: 'east',
      abilities: [
        {
          name: 'walk',
          args: []
        },
        {
          name: 'attack',
          args: []
        },
        {
          name: 'feel',
          args: []
        }
      ]
    },
    units: [
      {
        type: 'sludge',
        x: 4,
        y: 0,
        facing: 'west'
      }
    ]
  }
};

const playerCode = `
  class Player {
    playTurn(warrior) {
      if (warrior.feel().isEnemy()) {
        warrior.attack();
      } else {
        warrior.walk();
      }
    }
  }
`;

const { passed, score, events } = playLevel(levelConfig, playerCode);
```
