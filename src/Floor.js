import { viewObject } from './decorators/viewObject';
import Position from './Position';
import Space from './Space';
import Warrior from './units/Warrior';

const viewObjectShape = {
  size: {
    width() {
      return this.width;
    },
    height() {
      return this.height;
    },
  },
  stairs: {
    x() {
      return this.stairsLocation[0];
    },
    y() {
      return this.stairsLocation[1];
    },
  },
  units() {
    return this.units;
  },
};

@viewObject(viewObjectShape)
export default class Floor {
  _width;
  _height;
  _stairsLocation = [-1, -1];
  _units = [];

  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(width) {
    this._width = width;
  }

  get height() {
    return this._height;
  }

  set height(height) {
    this._height = height;
  }

  get stairsLocation() {
    return this._stairsLocation;
  }

  get stairsSpace() {
    return this.getSpaceAt(...this.stairsLocation);
  }

  get units() {
    return this._units.filter((unit) => unit.position);
  }

  get otherUnits() {
    return this.units.filter((unit) => !(unit instanceof Warrior));
  }

  get uniqueUnits() {
    const uniqueUnits = [];
    this.units.forEach((unit) => {
      if (!uniqueUnits.map((uniqueUnit) => uniqueUnit.constructor).includes(unit.constructor)) {
        uniqueUnits.push(unit);
      }
    });

    return uniqueUnits;
  }

  placeStairs(x, y) {
    this._stairsLocation = [x, y];
  }

  addUnit(unit, x, y, direction) {
    unit.position = new Position(this, x, y, direction);
    this._units.push(unit);
  }

  getSpaceAt(x, y) {
    return new Space(this, x, y);
  }

  getUnitAt(x, y) {
    return this.units.find((unit) => unit.position.isAt(x, y));
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
  }
}
