import {
  BACKWARD,
  DIRECTION_ARRAY,
  EAST,
  FORWARD,
  LEFT,
  NORTH,
  RELATIVE_DIRECTION_ARRAY,
  RIGHT,
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
    return this.direction;
  },
};

@viewObject(viewObjectShape)
export default class Position {
  constructor(floor, x, y, direction = NORTH) {
    this.floor = floor;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  getSpace() {
    return this.floor.getSpaceAt(this.x, this.y);
  }

  isAt(x, y) {
    return this.x === x && this.y === y;
  }

  getRelativeSpace(relativeDirection, forward = 1, right = 0) {
    Position.verifyDirection(relativeDirection);
    const offset = Position.offset(relativeDirection, forward, right);
    const [x, y] = this.translateOffset(...offset);
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
      if (x > this.x) {
        return EAST;
      }

      return WEST;
    }

    if (y > this.y) {
      return SOUTH;
    }

    return NORTH;
  }

  getRelativeDirection(direction) {
    let offset = DIRECTION_ARRAY.indexOf(direction) - DIRECTION_ARRAY.indexOf(this.direction);
    if (offset > 3) {
      offset -= 4;
    } else if (offset < 0) {
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
    switch (this.direction) {
      case NORTH:
        return [this.x + right, this.y - forward];
      case EAST:
        return [this.x + forward, this.y + right];
      case SOUTH:
        return [this.x - right, this.y + forward];
      case WEST:
        return [this.x - forward, this.y - right];
      default:
        throw new Error(`Unknown direction '${this.direction}'`);
    }
  }

  move(relativeDirection, forward = 1, right = 0) {
    Position.verifyDirection(relativeDirection);
    const offset = Position.offset(relativeDirection, forward, right);
    [this.x, this.y] = this.translateOffset(...offset);
  }

  rotate(relativeDirection) {
    Position.verifyDirection(relativeDirection);
    let offset =
      DIRECTION_ARRAY.indexOf(this.direction) + RELATIVE_DIRECTION_ARRAY.indexOf(relativeDirection);
    if (offset > 3) {
      offset -= 4;
    } else if (offset < 0) {
      offset += 4;
    }

    this.direction = DIRECTION_ARRAY[offset];
  }

  static offset(relativeDirection, forward = 1, right = 0) {
    switch (relativeDirection) {
      case FORWARD:
        return [forward, -right];
      case RIGHT:
        return [right, forward];
      case BACKWARD:
        return [-forward, right];
      case LEFT:
        return [-right, -forward];
      default:
        throw new Error(`Unknown relative direction '${relativeDirection}'.`);
    }
  }

  static verifyDirection(relativeDirection) {
    if (!RELATIVE_DIRECTION_ARRAY.includes(relativeDirection)) {
      const validDirections = RELATIVE_DIRECTION_ARRAY.map(
        validDirection => `'${validDirection}'`,
      ).join(', ');
      throw new Error(
        `Unknown direction '${relativeDirection}'. Should be one of: ${validDirections}.`,
      );
    }
  }
}
