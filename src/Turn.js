import Sense from './abilities/senses/Sense';
import playerObject from './decorators/playerObject';

const propertyBlacklist = [
  '_action',
  '_senses',
  'constructor',
  '_addAction',
  '_addSense',
  'action',
];

@playerObject(propertyBlacklist)
export default class Turn {
  _action = null;
  _senses = new Map();

  constructor(abilities) {
    abilities.forEach((ability, name) => {
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
    this._senses.set(name, sense);
    Object.defineProperty(this, name, {
      value: (...args) => this._senses.get(name).perform(...args),
    });
  }
}
