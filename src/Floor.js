import { uniqBy } from 'lodash';

import Position from './Position';
import Space from './Space';
import viewObject from './decorators/viewObject';

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
  warrior() {
    return this.warrior;
  },
  units() {
    return this.otherUnits;
  },
};

@viewObject(viewObjectShape)
export default class Floor {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.stairsLocation = [-1, -1];
    this.units = [];
  }

  getStairsSpace() {
    return this.getSpaceAt(...this.stairsLocation);
  }

  getUnits() {
    return this.units.filter(unit => unit.position);
  }

  getWarrior() {
    return this.getUnits().find(unit => unit.getType() === 'warrior');
  }

  getOtherUnits() {
    return this.getUnits().filter(unit => unit.getType() !== 'warrior');
  }

  getUniqueUnits() {
    return uniqBy(this.getUnits(), 'type');
  }

  placeStairs(x, y) {
    this.stairsLocation = [x, y];
  }

  addUnit(unit, { x, y, direction }) {
    const positionedUnit = unit;
    positionedUnit.position = new Position(this, x, y, direction);
    this.units.push(positionedUnit);
  }

  getSpaceAt(x, y) {
    return new Space(this, x, y);
  }

  getUnitAt(x, y) {
    return this.getUnits().find(unit => unit.position.isAt(x, y));
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
  }
}
