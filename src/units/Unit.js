import camelCase from 'lodash.camelcase';
import startCase from 'lodash.startcase';
import { BEING_UNBOUND, DYING, TAKING_DAMAGE } from '../constants/states';
import viewObject from '../decorators/viewObject';
import Turn from '../Turn';
import Logger from '../Logger';

const viewObjectShape = {
  id() {
    return this.id;
  },
  name() {
    return this.name;
  },
  type() {
    return this.type;
  },
  position() {
    return this.position;
  },
  health() {
    return this.health;
  },
};

@viewObject(viewObjectShape)
export default class Unit {
  _id = null;
  _position = null;
  _attackPower = 0;
  _shootPower = 0;
  _maxHealth = 0;
  _health = null;
  _abilities = new Map();
  _currentTurn = null;

  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

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

    Logger.unit(this.toViewObject(), BEING_UNBOUND, 'released from bonds');
  }

  bind() {
    this._bound = true;
  }

  takeDamage(amount) {
    if (this.isBound()) {
      this.unbind();
    }

    if (this.health) {
      const revisedAmount = this.health - amount < 0 ? this.health : amount;
      this.health -= revisedAmount;

      Logger.unit(
        this.toViewObject(),
        TAKING_DAMAGE,
        `takes ${revisedAmount} damage, ${this.health} health power left`,
      );

      if (!this.health) {
        Logger.unit(this.toViewObject(), DYING, 'dies');

        this.position = null;

        Logger.unit(this.toViewObject());
      }
    }
  }

  playTurn(turn) { // eslint-disable-line no-unused-vars
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

  earnPoints(points) { // eslint-disable-line no-unused-vars
    // To be overriden by subclass
  }

  toString() {
    return this.name;
  }

  _nextTurn() {
    return new Turn(this.abilities);
  }
}
