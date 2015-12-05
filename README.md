# WarriorJS Engine

```javascript
import Engine from 'warriorjs-engine';
```

## Engine.play(config, warrior)

Plays the level defined in the passed in `config` with the passed in `warrior`. Returning an object with the result (whether it passed the level or not), the points earned and the level trace.

```javascript
Engine.play(config, warrior) // => { passed, points, trace }
```

**Example**

```javascript
const config = {
  timeBonus: 15,

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
    abilities: {
      attack: [],
      feel: []
    }
  },

  units: [
    {
      type: 'sludge',
      x: 4,
      y: 0,
      facing: 'west'
    }
  ]
};

const warrior = {
  name: 'Spartacus',
  playerCode: 'class Player { ... }',
  abilities: {
    walk: []
  }
};

const result = Engine.play(config, warrior);
result.passed;
result.points;
result.trace;
```
