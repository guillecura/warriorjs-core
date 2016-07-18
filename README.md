![banner](https://cdn.rawgit.com/olistic/warriorjs-engine/master/warriorjs-logo.svg)

[![Build Status](https://img.shields.io/travis/olistic/warriorjs-engine/v2.svg?style=flat-square)](https://travis-ci.org/olistic/warriorjs-engine)
[![npm](https://img.shields.io/npm/v/warriorjs-engine.svg?style=flat-square)](https://www.npmjs.com/package/warriorjs-engine)

# WarriorJS Engine

*There's a small chance that you have played the game WarriorJS before, and an even smaller chance that you have come here intentionally, so you may be wondering what's this all about...*

**This is the rules engine behind [WarriorJS](https://github.com/olistic/warriorjs), distributed as a standalone npm package.**

## Installation

```bash
$ npm install --save warriorjs-engine@next
```

## API Reference

The WarriorJS Engine API exposes a single yet important function:

### `playLevel(levelConfig, warriorName, playerCode, [maxTurns])`

Plays a WarriorJS level using the player's code.

#### Arguments

1. `levelConfig` *(Object)*: The configuration of the level, with the following members:
  * `timeBonus` *(Number)*: Amount of turns the player has to complete the level obtaining bonus points.
  * `floor` *(Object)*: The floor of the level, with the following members:
    * `size` *(Object)*: The size of the floor.
    * `stairs` *(Object)*: The position of the stairs.
    * `units` *(Array)*: The units in the level.
2. `warriorName` *(String)*: The name of the warrior.
3. `playerCode` *(String)*: The code written by the player.
4. `[maxTurns]` *(Number)*: The maximum number of turns that will be played.

#### Returns

*(Object)* An object containing the play result with the following members:
  * `events` *(Array)*: The sequence of events that took place during the play.
  * `passed` *(Boolean)*: Whether the level was passed or not.
  * `score` *(Object)*:
    * `warrior` *(Number)*: The points earned by the warrior by killing units and rescuing captives.
    * `timeBonus` *(Number)*: A bonus for completing the level in less than a specified amount of turns.
    * `clearBonus` *(Number)*: A bonus for defeating all enemies and rescuing all captives.

#### Example

```javascript
import playLevel from 'warriorjs-engine';

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
    units: [
      {
        id: 'r10qaXdP',
        type: 'warrior',
        position: {
          x: 0,
          y: 0,
          direction: 'east'
        },
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
      {
        id: 'Bktha7dP'
        type: 'sludge',
        position: {
          x: 4,
          y: 0,
          direction: 'west'
        }
      }
    ]
  }
};

const warriorName = 'Spartacus';

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

const { events, passed, score } = playLevel(levelConfig, warriorName, playerCode);
```
