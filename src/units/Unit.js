import camelCase from 'lodash.camelcase';
import startCase from 'lodash.startcase';

import Logger from '../Logger';
import Turn from '../Turn';
import viewObject from '../decorators/viewObject';

const viewObjectShape = {
  name() {
    return this.name;
  },
  type() {
    return this.type;
  },
  health() {
    return this.health;
  },
  x() {
    return this.position.x;
  },
  y() {
    return this.position.y;
  },
  facing() {
    return this.position.direction;
  },
};

@viewObject(viewObjectShape)
export default class Unit {
  _position = null;
  _attackPower = 0;
  _shootPower = 0;
  _maxHealth = 0;
  _health = null;
  _abilities = new Map();
  _currentTurn = null;

  get name() {
    return startCase(this.constructor.name);
  }

  get type() {
    return camelCase(this.constructor.name);
  }

  get position() {
    return this._position;
  }

  set position(position) {
    this._position = position;
  }

  get attackPower() {
    return this._attackPower;
  }

  get shootPower() {
    return this._shootPower;
  }

  get maxHealth() {
    return this._maxHealth;
  }

  get health() {
    this._health = this._health === null ? this._maxHealth : this._health;
    return this._health;
  }

  set health(health) {
    this._health = health;
  }

  get abilities() {
    return this._abilities;
  }

  isAlive() {
    return this.position !== null;
  }

  isBound() {
    return this._bound;
  }

  unbind() {
    this._bound = false;

    this.say('released from bonds');
  }

  bind() {
    this._bound = true;
  }

  say(message) {
    Logger.unitSpoke(`${this.name} ${message}`, this.type);
  }

  takeDamage(amount) {
    if (this.isBound()) {
      this.unbind();
    }

    if (this.health) {
      const revisedAmount = this.health - amount < 0 ? this.health : amount;
      this.health -= revisedAmount;

      this.say(`takes ${revisedAmount} damage, ${this.health} health power left`);

      if (!this.health) {
        this.say('dies');

        this.position = null;
      }
    }
  }

  // eslint-disable-next-line
  playTurn(turn) {
    // To be overriden by subclass
  }

  prepareTurn() {
    this._currentTurn = this._nextTurn();
    this.playTurn(this._currentTurn);
  }

  performTurn() {
    if (this.isAlive()) {
      this.abilities.forEach(ability => ability.passTurn());
      if (this._currentTurn.action && !this.isBound()) {
        const [name, args] = this._currentTurn.action;
        this.abilities.get(name).perform(...args);
      }
    }
  }

  // eslint-disable-next-line
  earnPoints(points) {
    // To be overriden by subclass
  }

  toString() {
    return this.name;
  }

  _nextTurn() {
    return new Turn(this.abilities);
  }
}
