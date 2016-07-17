import {
  NORTH,
  EAST,
  SOUTH,
  WEST,
  DIRECTION_ARRAY,
  RELATIVE_DIRECTION_ARRAY,
} from './constants/directions';
import viewObject from './decorators/viewObject';

const viewObjectShape = {
  x() {
    return this.x;
  },
  y() {
    return this.y;
  },
  direction() {
    return this.direction;
  },
};

@viewObject(viewObjectShape)
export default class Position {
  _floor;
  _x;
  _y;
  _directionIndex;

  constructor(floor, x, y, direction = NORTH) {
    this._floor = floor;
    this._x = x;
    this._y = y;
    this._directionIndex = DIRECTION_ARRAY.indexOf(direction);
  }

  get floor() {
    return this._floor;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get space() {
    return this.floor.getSpaceAt(this.x, this.y);
  }

  get direction() {
    return DIRECTION_ARRAY[this._directionIndex];
  }

  isAt(x, y) {
    return this.x === x && this.y === y;
  }

  move(forward, right = 0) {
    [this._x, this._y] = this._translateOffset(forward, right);
  }

  rotate(amount) {
    this._directionIndex += amount;
    while (this._directionIndex > 3) this._directionIndex -= 4;
    while (this._directionIndex < 0) this._directionIndex += 4;
  }

  getRelativeSpace(forward, right = 0) {
    const [x, y] = this._translateOffset(forward, right);
    return this.floor.getSpaceAt(x, y);
  }

  getDistanceOf(space) {
    const [x, y] = space.location;
    return Math.abs(this.x - x) + Math.abs(this.y - y);
  }

  getDistanceFromStairs() {
    return this.getDistanceOf(this.floor.stairsSpace);
  }

  getDirectionOf(space) {
    const [x, y] = space.location;
    if (Math.abs(this.x - x) > Math.abs(this.y - y)) {
      return x > this.x ? EAST : WEST;
    }

    return y > this.y ? SOUTH : NORTH;
  }

  getRelativeDirection(direction) {
    let offset = DIRECTION_ARRAY.indexOf(direction) - this._directionIndex;
    while (offset > 3) offset -= 4;
    while (offset < 0) offset += 4;
    return RELATIVE_DIRECTION_ARRAY[offset];
  }

  getRelativeDirectionOf(space) {
    return this.getRelativeDirection(this.getDirectionOf(space));
  }

  getRelativeDirectionOfStairs() {
    return this.getRelativeDirectionOf(this.floor.stairsSpace);
  }

  _translateOffset(forward, right) {
    if (this.direction === NORTH) {
      return [this.x + right, this.y - forward];
    } else if (this.direction === EAST) {
      return [this.x + forward, this.y + right];
    } else if (this.direction === SOUTH) {
      return [this.x - right, this.y + forward];
    } else if (this.direction === WEST) {
      return [this.x - forward, this.y - right];
    }

    throw new Error(`Unknown direction '${this.direction}'`);
  }
}
