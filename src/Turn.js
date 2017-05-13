export default class Turn {
  constructor(abilities) {
    this.action = null;
    this.senses = new Map();

    abilities.forEach((ability, name) => {
      if (ability.type === 'action') {
        this.addAction(name);
      } else {
        this.addSense(name, ability);
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
