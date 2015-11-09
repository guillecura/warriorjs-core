import Directions from './constants/Directions';
import RelativeDirections from './constants/RelativeDirections';

const DIRECTIONS = [
  Directions.north,
  Directions.east,
  Directions.south,
  Directions.west,
];

const RELATIVE_DIRECTIONS = [
  RelativeDirections.forward,
  RelativeDirections.right,
  RelativeDirections.backward,
  RelativeDirections.left,
];

class Position {
  _floor;
  _x;
  _y;
  _directionIndex;

  constructor(floor, x, y, direction = Directions.north) {
    this._floor = floor;
    this._x = x;
    this._y = y;
    this._directionIndex = DIRECTIONS.indexOf(direction);
  }

  getFloor() {
    return this._floor;
  }

  getSpace() {
    return this.getFloor().getSpaceAt(this._x, this._y);
  }

  getDirection() {
    return DIRECTIONS[this._directionIndex];
  }

  isAt(x, y) {
    return this._x === x && this._y === y;
  }

  translateOffset(forward, right) {
    const direction = this.getDirection();
    if (direction === Directions.north) {
      return [this._x + right, this._y - forward];
    } else if (direction === Directions.east) {
      return [this._x + forward, this._y + right];
    } else if (direction === Directions.south) {
      return [this._x - right, this._y + forward];
    } else if (direction === Directions.west) {
      return [this._x - forward, this._y - right];
    }
  }

  move(forward, right = 0) {
    [this._x, this._y] = this.translateOffset(forward, right);
  }

  rotate(amount) {
    this._directionIndex += amount;
    while (this._directionIndex > 3) this._directionIndex -= 4;
    while (this._directionIndex < 0) this._directionIndex += 4;
  }

  getRelativeSpace(forward, right = 0) {
    const [x, y] = this.translateOffset(forward, right);
    return this.getFloor().getSpaceAt(x, y);
  }

  getDistanceOf(space) {
    const [x, y] = space.getLocation();
    return Math.abs(this._x - x) + Math.abs(this._y - y);
  }

  getDistanceFromStairs() {
    return this.getDistanceOf(this.getFloor().getStairsSpace());
  }

  getDirectionOf(space) {
    const [x, y] = space.getLocation();
    if (Math.abs(this._x - x) > Math.abs(this._y - y)) {
      return x > this._x ? Directions.east : Directions.west;
    }

    return y > this._y ? Directions.south : Directions.north;
  }

  getRelativeDirection(direction) {
    let offset = DIRECTIONS.indexOf(direction) - this._directionIndex;
    while (offset > 3) offset -= 4;
    while (offset < 0) offset += 4;
    return RELATIVE_DIRECTIONS[offset];
  }

  getRelativeDirectionOf(space) {
    return this.getRelativeDirection(this.getDirectionOf(space));
  }

  getRelativeDirectionOfStairs() {
    return this.getRelativeDirectionOf(this.getFloor().getStairsSpace());
  }

  toViewObject() {
    return {
      x: this._x,
      y: this._y,
      facing: this.getDirection(),
    };
  }
}

export default Position;
