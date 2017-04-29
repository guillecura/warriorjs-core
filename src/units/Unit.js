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
    this.bound = false;
    this.abilities = new Map();
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

  isAlive() {
    return this.position !== null;
  }

  isBound() {
    return this.bound;
  }

  unbind() {
    this.bound = false;

    Logger.unit(this, 'beingUnbound', 'released from bonds');
  }

  bind() {
    this.bound = true;
  }

  takeDamage(amount) {
    if (this.isBound()) {
      this.unbind();
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
      this.abilities.forEach(ability => ability.passTurn());
      if (this.currentTurn.action && !this.isBound()) {
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
