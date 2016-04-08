![banner](https://cdn.rawgit.com/olistic/warriorjs-engine/master/warriorjs-logo.svg)

[![Travis](https://img.shields.io/travis/olistic/warriorjs-engine.svg?style=flat-square)](https://travis-ci.org/olistic/warriorjs-engine)
[![npm](https://img.shields.io/npm/v/warriorjs-engine.svg?style=flat-square)](https://www.npmjs.com/package/warriorjs-engine)

# WarriorJS Engine

There's a small chance that you have played the game [WarriorJS](https://github.com/olistic/warriorjs) before, and an even smaller chance that you have landed here by accident, so you may be wondering what's this all about...

**This is the rules engine behind the WarriorJS game, distributed as an standalone npm package.**

## Installation

```bash
$ npm install --save warriorjs-engine
```

## API Reference

The WarriorJS Engine API exposes a single yet important function:

### `playLevel(levelConfig, profile, [maxTurns])`

Plays a WarriorJS level using the player's profile.

#### Arguments

1. `levelConfig` *(Object)*: The configuration of the level.
2. `profile` *(Object)*: The player's profile with the following members:
  * `playerCode` *(String)*: The code written by the player.
  * `warriorName` *(String)*: The name of the warrior.
  * `abilities` *(Array)*: The abilities already learnt by the warrior.
3. `[maxTurns]` *(Number)*: The maximum number of turns that will be performed.

#### Returns

*(Object)* An object containing the play result with the following members:
  * `passed` *(Boolean)*: Whether the level was passed or not.
  * `score` *(Object)*:
    * `level` *(Number)*: The points earned by the warrior by killing units and rescuing captives.
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
      x: 0,
      y: 0,
      facing: 'east',
      abilities: [
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

const profile = {
  playerCode: `
    class Player {
      playTurn(warrior) {
        if (warrior.feel().isEnemy()) {
          warrior.attack();
        } else {
          warrior.walk();
        }
      }
    }
  `,
  warriorName: 'Spartacus',
  abilities: [
    {
      name: 'walk',
      args: []
    }
  ]
};

const { passed, score, events } = playLevel(levelConfig, profile);
```
