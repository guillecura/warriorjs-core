import { camelCase, startCase } from 'lodash';

import Logger from '../Logger';
import Turn from '../Turn';
import viewObject from '../decorators/viewObject';

const viewObjectShape = {
  index() {
    return this.index;
  },
  name() {
    return this.getName();
  },
  type() {
    return this.getType();
  },
  position() {
    return this.position;
  },
  health() {
    return this.getHealth();
  },
};

@viewObject(viewObjectShape)
export default class Unit {
  constructor(index) {
    this.index = index;
    this.position = null;
    this.maxHealth = 0;
    this.health = null;
    this.attackPower = 0;
    this.shootPower = 0;
    this.abilities = new Map();
    this.effects = new Map();
    this.currentTurn = null;
  }

  getName() {
    return startCase(this.constructor.name);
  }

  getType() {
    return camelCase(this.constructor.name);
  }

  getHealth() {
    this.health = this.health === null ? this.maxHealth : this.health;
    return this.health;
  }

  addAbility(ability) {
    this.abilities.set(ability.getName(), ability);
  }

  addEffect(effect) {
    this.effects.set(effect.getName(), effect);
  }

  removeEffect(name) {
    this.effects.delete(name);
  }

  isAlive() {
    return this.position !== null;
  }

  takeDamage(amount) {
    if (this.effects.has('bound')) {
      this.removeEffect('bound');
    }

    if (this.getHealth()) {
      const revisedAmount = this.getHealth() - amount < 0 ? this.getHealth() : amount;
      this.health -= revisedAmount;

      Logger.unit(
        this,
        'takingDamage',
        `takes ${revisedAmount} damage, ${this.getHealth()} health power left`,
      );

      if (!this.getHealth()) {
        Logger.unit(this, 'dying', 'dies');

        this.position = null;

        Logger.unit(this);
      }
    }
  }

  getNextTurn() {
    return new Turn(this.abilities);
  }

  // eslint-disable-next-line
  playTurn(turn) {
    // To be overriden by subclass
  }

  prepareTurn() {
    this.currentTurn = this.getNextTurn();
    this.playTurn(this.currentTurn);
  }

  performTurn() {
    if (this.isAlive()) {
      this.effects.forEach(effect => effect.passTurn());
      if (this.currentTurn.action && !this.effects.has('bound')) {
        const [name, args] = this.currentTurn.action;
        this.abilities.get(name).perform(...args);
      }
    }
  }

  // eslint-disable-next-line
  earnPoints(points) {
    // To be overriden by subclass
  }

  toString() {
    return this.getName();
  }
}
