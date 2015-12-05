import { DIRECTIONS, ORDERED_DIRECTIONS } from './constants/directions';
import { ORDERED_RELATIVE_DIRECTIONS } from './constants/relativeDirections';
import { viewObject } from './decorators/viewObject';

const viewProperties = {
  x: '_x',
  y: '_y',
  facing: 'direction',
};

@viewObject(viewProperties)
export default class Position {
  _floor;
  _x;
  _y;
  _directionIndex;

  constructor(floor, x, y, direction = DIRECTIONS.north) {
    this._floor = floor;
    this._x = x;
    this._y = y;
    this._directionIndex = ORDERED_DIRECTIONS.indexOf(direction);
  }

  get floor() {
    return this._floor;
  }

  get space() {
    return this.floor.getSpaceAt(this._x, this._y);
  }

  get direction() {
    return ORDERED_DIRECTIONS[this._directionIndex];
  }

  isAt(x, y) {
    return this._x === x && this._y === y;
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
    return Math.abs(this._x - x) + Math.abs(this._y - y);
  }

  getDistanceFromStairs() {
    return this.getDistanceOf(this.floor.stairsSpace);
  }

  getDirectionOf(space) {
    const [x, y] = space.location;
    if (Math.abs(this._x - x) > Math.abs(this._y - y)) {
      return x > this._x ? DIRECTIONS.east : DIRECTIONS.west;
    }

    return y > this._y ? DIRECTIONS.south : DIRECTIONS.north;
  }

  getRelativeDirection(direction) {
    let offset = ORDERED_DIRECTIONS.indexOf(direction) - this._directionIndex;
    while (offset > 3) offset -= 4;
    while (offset < 0) offset += 4;
    return ORDERED_RELATIVE_DIRECTIONS[offset];
  }

  getRelativeDirectionOf(space) {
    return this.getRelativeDirection(this.getDirectionOf(space));
  }

  getRelativeDirectionOfStairs() {
    return this.getRelativeDirectionOf(this.floor.stairsSpace);
  }

  _translateOffset(forward, right) {
    if (this.direction === DIRECTIONS.north) {
      return [this._x + right, this._y - forward];
    } else if (this.direction === DIRECTIONS.east) {
      return [this._x + forward, this._y + right];
    } else if (this.direction === DIRECTIONS.south) {
      return [this._x - right, this._y + forward];
    } else if (this.direction === DIRECTIONS.west) {
      return [this._x - forward, this._y - right];
    }
  }
}
