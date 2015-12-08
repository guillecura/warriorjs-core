# WarriorJS Engine

```javascript
import Engine from 'warriorjs-engine';
```

## Engine.play(config, profile)

Plays the level defined in the passed in `config` with the passed in `profile`. Returning an object with the result (whether it passed the level or not), the points earned and the level trace.

```javascript
Engine.play(config, profile) // => { passed, points, trace }
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

const result = Engine.play(config, profile);
result.passed;
result.points;
result.trace;
```
