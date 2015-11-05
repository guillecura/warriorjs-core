import Turn from '../Turn';
import Actions from '../constants/Actions';
import Senses from '../constants/Senses';
import Attack from '../abilities/Attack';
import Bind from '../abilities/Bind';
import Detonate from '../abilities/Detonate';
import DirectionOf from '../abilities/DirectionOf';
import DirectionOfStairs from '../abilities/DirectionOfStairs';
import DistanceOf from '../abilities/DistanceOf';
import Explode from '../abilities/Explode';
import Feel from '../abilities/Feel';
import Health from '../abilities/Health';
import Listen from '../abilities/Listen';
import Look from '../abilities/Look';
import Pivot from '../abilities/Pivot';
import Rescue from '../abilities/Rescue';
import Rest from '../abilities/Rest';
import Shoot from '../abilities/Shoot';
import Walk from '../abilities/Walk';

class Base {
  _name = 'Base';
  _position = null;
  _attackPower = 0;
  _shootPower = 0;
  _maxHealth = 0;
  _health = null;
  _actions = {};
  _senses = {};

  getName() {
    return this._name;
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
    // TODO `${this.getName()} ${message}`
  }

  takeDamage(amount) {
    if (this.isBound()) {
      this.unbind();
    }

    if (this.getHealth()) {
      const revisedAmount = this.getHealth() - amount < 0 ? this.getHealth() : amount;
      this._health -= revisedAmount;
      this.say(`takes ${revisedAmount} damage, ${this.getHealth()} health power left`);
      if (!this.getHealth()) {
        this.setPosition(null);
        this.say('dies');
      }
    }
  }

  addActions(newActions) {
    newActions.forEach(actionName => {
      let action;
      if (actionName === Actions.attack) {
        action = new Attack(this);
      } else if (actionName === Actions.bind) {
        action = new Bind(this);
      } else if (actionName === Actions.detonate) {
        action = new Detonate(this);
      } else if (actionName === Actions.explode) {
        action = new Explode(this);
      } else if (actionName === Actions.pivot) {
        action = new Pivot(this);
      } else if (actionName === Actions.rescue) {
        action = new Rescue(this);
      } else if (actionName === Actions.rest) {
        action = new Rest(this);
      } else if (actionName === Actions.shoot) {
        action = new Shoot(this);
      } else if (actionName === Actions.walk) {
        action = new Walk(this);
      } else {
        throw new Error(`Unknown action '${action}'`);
      }

      this._actions[actionName] = action;
    });
  }

  addSenses(newSenses) {
    newSenses.forEach(senseName => {
      let sense;
      if (senseName === Senses.directionOf) {
        sense = new DirectionOf(this);
      } else if (senseName === Senses.directionOfStairs) {
        sense = new DirectionOfStairs(this);
      } else if (senseName === Senses.distanceOf) {
        sense = new DistanceOf(this);
      } else if (senseName === Senses.feel) {
        sense = new Feel(this);
      } else if (senseName === Senses.health) {
        sense = new Health(this);
      } else if (senseName === Senses.listen) {
        sense = new Listen(this);
      } else if (senseName === Senses.look) {
        sense = new Look(this);
      } else {
        throw new Error(`Unknown sense '${sense}'`);
      }

      this._senses[senseName] = sense;
    });
  }

  getNextTurn() {
    return new Turn(this.getActions(), this.getSenses());
  }

  playTurn() {
    // To be overriden by subclass
  }

  prepareTurn() {
    this._currentTurn = this.getNextTurn();
    this.playTurn(this._currentTurn);
  }

  performTurn() {
    if (this.getPosition()) {
      Object.values(this.getAbilities()).forEach(ability => ability.passTurn());
      if (this._currentTurn.getAction() && !this.isBound()) {
        const [name, args] = this._currentTurn.getAction();
        this.getActions()[name].perform(...args);
      }
    }
  }

  earnPoints() {
    // To be overriden by subclass
  }

  toString() {
    return this.getName();
  }
}

export default Base;
