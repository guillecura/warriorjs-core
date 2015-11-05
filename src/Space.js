import Warrior from './units/Warrior';

const ALLOWED_MEMBERS = [
  'isWall',
  'isWarrior',
  'isPlayer',
  'isEnemy',
  'isCaptive',
  'isEmpty',
  'isStairs',
  'isTicking',
];

const originalInstances = new WeakMap();

class Space {
  _floor;
  _x;
  _y;

  constructor(floor, x, y) {
    this._floor = floor;
    this._x = x;
    this._y = y;
  }

  getLocation() {
    return [this._x, this._y];
  }

  getUnit() {
    return this._floor.getUnitAt(...this.getLocation());
  }

  isWall() {
    return this._floor.isOutOfBounds(...this.getLocation());
  }

  isWarrior() {
    return this.getUnit() instanceof Warrior;
  }

  isPlayer() {
    return this.isWarrior();
  }

  isEnemy() {
    return this.getUnit() && !this.isPlayer() && !this.isCaptive();
  }

  isCaptive() {
    return this.getUnit() && this.getUnit().isBound();
  }

  isEmpty() {
    return !this.getUnit() && !this.isWall();
  }

  isStairs() {
    const [stairsX, stairsY] = this._floor.getStairsLocation();
    const [x, y] = this.getLocation();
    return stairsX === x && stairsY === y;
  }

  isTicking() {
    return this.getUnit() && Object.keys(this.getUnit().getActions()).includes('explode');
  }

  toString() {
    if (this.getUnit()) {
      return this.getUnit().toString();
    } else if (this.isWall()) {
      return 'wall';
    }

    return 'nothing';
  }

  /**
   * Make a new object that acts like a proxy of the Space, preventing the player
   * to access methods that don't belong to the Player API
   */
  getPlayerObject(allowedMembers = ALLOWED_MEMBERS) {
    const playerObject = {};

    // Add allowed members to the player object and bind them to the original instance
    allowedMembers
      .filter(id => typeof this[id] === 'function')
      .forEach(id => playerObject[id] = this[id].bind(this));

    // Add a flag to the object indicating it is a proxy
    playerObject.isPlayerObject = true;

    // Reference the original instance to the player object
    originalInstances.set(playerObject, this);

    return playerObject;
  }
}

export default Space;
export { originalInstances as originalSpaces };
