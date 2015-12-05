import Sense from './abilities/senses/Sense';
import { playerObject } from './decorators/playerObject';

const allowedMembers = [
  'attack',
  'bind',
  'detonate',
  'directionOf',
  'directionOfStairs',
  'distanceOf',
  'explode',
  'feel',
  'health',
  'listen',
  'look',
  'pivot',
  'rescue',
  'rest',
  'shoot',
  'walk',
];

@playerObject(allowedMembers)
export default class Turn {
  _action = null;
  _senses = {};

  constructor(abilities) {
    Object.entries(abilities).forEach(([name, ability]) => {
      if (ability instanceof Sense) {
        this._addSense(name, ability);
      } else {
        this._addAction(name);
      }
    });
  }

  get action() {
    return this._action;
  }

  _addAction(name) {
    Object.defineProperty(this, name, {
      value: (...args) => {
        if (this.action) {
          throw new Error('Only one action can be performed per turn.');
        }

        this._action = [name, args];
      },
    });
  }

  _addSense(name, sense) {
    this._senses[name] = sense;
    Object.defineProperty(this, name, {
      value: (...args) => this._senses[name].perform(...args),
    });
  }
}
