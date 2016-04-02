# WarriorJS Engine

```javascript
import Engine from 'warriorjs-engine';
```

## Engine.playLevel(config, profile, maxTurns)

Plays the level defined in the passed in `config` with the passed in `profile`, allowing `maxTurns` to complete the level (1000 by default). Returning an object with the result (whether it passed the level or not), the points earned and the sequence of events that took place during the play.

```javascript
Engine.playLevel(config, profile, maxTurns) // => { passed, score, events }
```

**Example**

```javascript
const config = {
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
        type: 'warrior',
        x: 0,
        y: 0,
        facing: 'east',
        abilities: {
          attack: [],
          feel: []
        }
      },
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
  abilities: {
    walk: []
  }
};

const MAX_TURNS = 120;

const { passed, score, events } = Engine.playLevel(config, profile, MAX_TURNS);
```
