import {
  DIRECTION_ARRAY,
  EAST,
  NORTH,
  RELATIVE_DIRECTION_ARRAY,
  SOUTH,
  WEST,
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
    return this.getDirection();
  },
};

@viewObject(viewObjectShape)
export default class Position {
  constructor(floor, x, y, direction = NORTH) {
    this.floor = floor;
    this.x = x;
    this.y = y;
    this.directionIndex = DIRECTION_ARRAY.indexOf(direction);
  }

  getSpace() {
    return this.floor.getSpaceAt(this.x, this.y);
  }

  getDirection() {
    return DIRECTION_ARRAY[this.directionIndex];
  }

  isAt(x, y) {
    return this.x === x && this.y === y;
  }

  move(forward, right = 0) {
    [this.x, this.y] = this.translateOffset(forward, right);
  }

  rotate(amount) {
    this.directionIndex += amount;
    while (this.directionIndex > 3) {
      this.directionIndex -= 4;
    }
    while (this.directionIndex < 0) {
      this.directionIndex += 4;
    }
  }

  getRelativeSpace(forward, right = 0) {
    const [x, y] = this.translateOffset(forward, right);
    return this.floor.getSpaceAt(x, y);
  }

  getDistanceOf(space) {
    const [x, y] = space.getLocation();
    return Math.abs(this.x - x) + Math.abs(this.y - y);
  }

  getDistanceFromStairs() {
    return this.getDistanceOf(this.floor.getStairsSpace());
  }

  getDirectionOf(space) {
    const [x, y] = space.getLocation();
    if (Math.abs(this.x - x) > Math.abs(this.y - y)) {
      return x > this.x ? EAST : WEST;
    }

    return y > this.y ? SOUTH : NORTH;
  }

  getRelativeDirection(direction) {
    let offset = DIRECTION_ARRAY.indexOf(direction) - this.directionIndex;
    while (offset > 3) {
      offset -= 4;
    }
    while (offset < 0) {
      offset += 4;
    }
    return RELATIVE_DIRECTION_ARRAY[offset];
  }

  getRelativeDirectionOf(space) {
    return this.getRelativeDirection(this.getDirectionOf(space));
  }

  getRelativeDirectionOfStairs() {
    return this.getRelativeDirectionOf(this.floor.getStairsSpace());
  }

  translateOffset(forward, right) {
    const direction = this.getDirection();
    switch (direction) {
      case NORTH:
        return [this.x + right, this.y - forward];
      case EAST:
        return [this.x + forward, this.y + right];
      case SOUTH:
        return [this.x - right, this.y + forward];
      case WEST:
        return [this.x - forward, this.y - right];
      default:
        throw new Error(`Unknown direction '${direction}'`);
    }
  }
}
