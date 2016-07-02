[![banner](https://cdn.rawgit.com/olistic/warriorjs-engine/master/warriorjs-logo.svg)](https://github.com/olistic/warriorjs)

[![Travis](https://img.shields.io/travis/olistic/warriorjs-engine.svg?style=flat-square)](https://travis-ci.org/olistic/warriorjs-engine)
[![npm](https://img.shields.io/npm/v/warriorjs-engine.svg?style=flat-square)](https://www.npmjs.com/package/warriorjs-engine)

# WarriorJS Engine

*There's a small chance that you have played the game WarriorJS before, and an even smaller chance that you have come here intentionally, so you may be wondering what's this all about...*

**This is the rules engine behind [WarriorJS](https://github.com/olistic/warriorjs), distributed as an standalone npm package.**

## Installation

```bash
$ npm install --save warriorjs-engine
```

## API Reference

The WarriorJS Engine API exposes a single yet important function:

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
import { playLevel } from 'warriorjs-engine';

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
      name: 'Spartacus'
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
