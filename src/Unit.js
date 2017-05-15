import Logger from './Logger';
import Turn from './Turn';

export default class Unit {
  constructor(type, maxHealth, bound = false) {
    this.type = type;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.bound = bound;
    this.abilities = new Map();
    this.effects = new Map();
    this.position = null;
    this.name = null;
    this.score = 0;
    this.turn = null;
    this.playTurn = () => {};
  }

  getName() {
    return this.name || this.type;
  }

  addAbility(name, ability) {
    this.abilities.set(name, ability);
  }

  addEffect(name, effect) {
    this.effects.set(name, effect);
  }

  isAlive() {
    return this.position !== null;
  }

  isBound() {
    return this.bound;
  }

  unbind() {
    this.bound = false;

    this.say('released from bonds');
  }

  bind() {
    this.bound = true;
  }

  say(message) {
    Logger.unit(this, message);
  }

  earnPoints(points) {
    this.score += points;

    if (this.type === 'Warrior') {
      this.say(`earns ${points} points`);
    }
  }

  heal(amount) {
    const revisedAmount = this.health + amount > this.maxHealth
      ? this.maxHealth - this.health
      : amount;
    this.health += revisedAmount;

    this.say(`receives ${revisedAmount} health, up to ${this.health} health`);
  }

  takeDamage(amount) {
    if (this.isBound()) {
      this.unbind();
    }

    const revisedAmount = this.health - amount < 0 ? this.health : amount;
    this.health -= revisedAmount;

    this.say(`takes ${revisedAmount} damage, ${this.health} health power left`);

    if (!this.health) {
      this.say('dies');

      this.position = null;

      this.say();
    }
  }

  damage(receiver, amount) {
    receiver.takeDamage(amount);
    if (!receiver.isAlive()) {
      this.earnPoints(receiver.maxHealth);
    }
  }

  getNextTurn() {
    return new Turn(this.abilities);
  }

  prepareTurn() {
    this.turn = this.getNextTurn();
    this.playTurn(this.turn);
  }

  performTurn() {
    if (this.isAlive()) {
      this.effects.forEach(effect => effect.passTurn());
      if (this.turn.action && !this.isBound()) {
        const [name, args] = this.turn.action;
        this.abilities.get(name).perform(...args);
      } else if (this.type === 'Warrior') {
        this.say('does nothing');
      }
    }
  }

  toViewObject() {
    return {
      name: this.getName(),
      type: this.type,
      position: {
        x: this.position.x,
        y: this.position.y,
        direction: this.position.direction,
      },
      maxHealth: this.maxHealth,
      health: this.health,
      score: this.score,
      bound: this.isBound(),
      abilities: [...this.abilities].map(([name, ability]) => ({
        name,
        description: ability.description,
      })),
      effects: [...this.effects].map(([name, effect]) => ({
        name,
        description: effect.description,
      })),
    };
  }

  toString() {
    return this.getName();
  }
}
