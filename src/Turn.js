import Sense from './abilities/senses/Sense';
import playerObject from './decorators/playerObject';

const propertyBlacklist = ['action', 'addAction', 'addSense', 'constructor', 'senses'];

@playerObject(propertyBlacklist)
export default class Turn {
  constructor(abilities) {
    this.action = null;
    this.senses = new Map();

    abilities.forEach((ability, name) => {
      if (ability instanceof Sense) {
        this.addSense(name, ability);
      } else {
        this.addAction(name);
      }
    });
  }

  addAction(name) {
    Object.defineProperty(this, name, {
      value: (...args) => {
        if (this.action) {
          throw new Error('Only one action can be performed per turn.');
        }

        this.action = [name, args];
      },
    });
  }

  addSense(name, sense) {
    this.senses.set(name, sense);
    Object.defineProperty(this, name, {
      value: (...args) => this.senses.get(name).perform(...args),
    });
  }
}
