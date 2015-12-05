import camelCase from 'lodash.camelcase';
import startCase from 'lodash.startcase';
import { ABILITIES } from '../constants/abilities';
import { viewObject } from '../decorators/viewObject';
import Turn from '../Turn';
import Logger from '../Logger';

const viewProperties = {
  name: 'name',
  type: 'type',
  position: 'position',
};

@viewObject(viewProperties)
export default class Unit {
  _position = null;
  _attackPower = 0;
  _shootPower = 0;
  _maxHealth = 0;
  _health = null;
  _abilities = {};
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
    Logger.log(this.type, `${this.name} ${message}`);
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
        this.position = null;

        this.say('dies');
      }
    }
  }

  addAbilities(newAbilities) {
    Object.entries(newAbilities).forEach(([name, args]) => {
      if (!(name in ABILITIES)) {
        throw new Error(`Unknown ability '${name}'.`);
      }

      this._abilities[name] = new ABILITIES[name](this, ...args);
    });
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
      Object.values(this.abilities).forEach((ability) => ability.passTurn());
      if (this._currentTurn.action && !this.isBound()) {
        const [name, args] = this._currentTurn.action;
        this.abilities[name].perform(...args);
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