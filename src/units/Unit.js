import Turn from '../Turn';
import Logger from '../Logger';
import Actions from '../abilities/actions';
import Senses from '../abilities/senses';

class Unit {
  _name = 'Unit';
  _type = null;
  _position = null;
  _attackPower = 0;
  _shootPower = 0;
  _maxHealth = 0;
  _health = null;
  _actions = {};
  _senses = {};
  _currentTurn = null;

  getName() {
    return this._name;
  }

  getType() {
    return this._type;
  }

  getPosition() {
    return this._position;
  }

  setPosition(position) {
    this._position = position;
  }

  getAttackPower() {
    return this._attackPower;
  }

  getShootPower() {
    return this._shootPower;
  }

  getMaxHealth() {
    return this._maxHealth;
  }

  getHealth() {
    this._health = this._health !== null ? this._health : this.getMaxHealth();
    return this._health;
  }

  setHealth(health) {
    this._health = health;
  }

  getActions() {
    return this._actions;
  }

  getSenses() {
    return this._senses;
  }

  getAbilities() {
    return Object.assign({}, this.getActions(), this.getSenses());
  }

  isAlive() {
    return this.getPosition() !== null;
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
    Logger.log(this.getType(), `${this.getName()} ${message}`);
  }

  takeDamage(amount) {
    if (this.isBound()) {
      this.unbind();
    }

    if (this.getHealth()) {
      const revisedAmount = this.getHealth() - amount < 0 ? this.getHealth() : amount;
      this._health -= revisedAmount;
      this.say(`takes ${amount} damage, ${this.getHealth()} health power left`);
      if (!this.getHealth()) {
        this.setPosition(null);
        this.say('dies');
      }
    }
  }

  addActions(newActions) {
    newActions.forEach(actionName => {
      if (!Actions.hasOwnProperty(actionName)) {
        throw new Error(`Unknown action '${actionName}'.`);
      }

      const Action = Actions[actionName];
      this._actions[actionName] = new Action(this);
    });
  }

  addSenses(newSenses) {
    newSenses.forEach(senseName => {
      if (!Senses.hasOwnProperty(senseName)) {
        throw new Error(`Unknown sense '${senseName}'.`);
      }

      const Sense = Senses[senseName];
      this._senses[senseName] = new Sense(this);
    });
  }

  getNextTurn() {
    return new Turn(this.getActions(), this.getSenses());
  }

  playTurn(turn) { // eslint-disable-line no-unused-vars
    // To be overriden by subclass
  }

  prepareTurn() {
    this._currentTurn = this.getNextTurn();
    this.playTurn(this._currentTurn);
  }

  performTurn() {
    if (this.getPosition()) {
      Object.values(this.getAbilities()).forEach((ability) => ability.passTurn());
      if (this._currentTurn.getAction() && !this.isBound()) {
        const [name, args] = this._currentTurn.getAction();
        this.getActions()[name].perform(...args);
      }
    }
  }

  earnPoints(points) { // eslint-disable-line no-unused-vars
    // To be overriden by subclass
  }

  toViewObject() {
    return {
      name: this.getName(),
      type: this.getType(),
      position: this.getPosition().toViewObject(),
    };
  }

  toString() {
    return this.getName();
  }
}

export default Unit;
