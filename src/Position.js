const DIRECTIONS = ['north', 'east', 'south', 'west'];
const RELATIVE_DIRECTIONS = ['forward', 'right', 'backward', 'left'];

export default class Position {
  constructor(floor, x, y, direction = 'north') {
    this.floor = floor;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  isAt(x, y) {
    return this.x === x && this.y === y;
  }

  getSpace() {
    return this.floor.getSpaceAt(this.x, this.y);
  }

  getRelativeSpace(relativeDirection, forward = 1, right = 0) {
    Position.verifyDirection(relativeDirection);
    const offset = Position.offset(relativeDirection, forward, right);
    const [x, y] = this.translateOffset(...offset);
    return this.floor.getSpaceAt(x, y);
  }

  getDistanceOf(space) {
    const [spaceX, spaceY] = space.getLocation();
    return Math.abs(this.x - spaceX) + Math.abs(this.y - spaceY);
  }

  getDistanceFromStairs() {
    return this.getDistanceOf(this.floor.getStairsSpace());
  }

  getDirectionOf(space) {
    const [spaceX, spaceY] = space.getLocation();
    if (Math.abs(this.x - spaceX) > Math.abs(this.y - spaceY)) {
      if (spaceX > this.x) {
        return 'east';
      }

      return 'west';
    }

    if (spaceY > this.y) {
      return 'south';
    }

    return 'north';
  }

  getRelativeDirection(direction) {
    const offset =
      (DIRECTIONS.length + (DIRECTIONS.indexOf(direction) - DIRECTIONS.indexOf(this.direction))) %
      DIRECTIONS.length;
    return RELATIVE_DIRECTIONS[offset];
  }

  getRelativeDirectionOf(space) {
    return this.getRelativeDirection(this.getDirectionOf(space));
  }

  getRelativeDirectionOfStairs() {
    return this.getRelativeDirectionOf(this.floor.getStairsSpace());
  }

  translateOffset(forward, right) {
    if (this.direction === 'north') {
      return [this.x + right, this.y - forward];
    } else if (this.direction === 'east') {
      return [this.x + forward, this.y + right];
    } else if (this.direction === 'south') {
      return [this.x - right, this.y + forward];
    }

    return [this.x - forward, this.y - right];
  }

  move(relativeDirection, forward = 1, right = 0) {
    Position.verifyDirection(relativeDirection);
    const offset = Position.offset(relativeDirection, forward, right);
    [this.x, this.y] = this.translateOffset(...offset);
  }

  rotate(relativeDirection) {
    Position.verifyDirection(relativeDirection);
    const offset =
      (DIRECTIONS.indexOf(this.direction) + RELATIVE_DIRECTIONS.indexOf(relativeDirection)) %
      DIRECTIONS.length;
    this.direction = DIRECTIONS[offset];
  }

  static offset(relativeDirection, forward = 1, right = 0) {
    if (relativeDirection === 'forward') {
      return [forward, -right];
    } else if (relativeDirection === 'right') {
      return [right, forward];
    } else if (relativeDirection === 'backward') {
      return [-forward, right];
    }

    return [-right, -forward];
  }

  static verifyDirection(relativeDirection) {
    if (!RELATIVE_DIRECTIONS.includes(relativeDirection)) {
      const validDirections = RELATIVE_DIRECTIONS.map(direction => `'${direction}'`).join(', ');
      throw new Error(
        `Unknown direction: '${relativeDirection}'. Should be one of: ${validDirections}.`,
      );
    }
  }
}
