import Position from './Position';
import Space from './Space';
import Warrior from './units/Warrior';

class Floor {
  _width = 0;
  _height = 0;
  _units = [];
  _stairsLocation = [-1, -1];

  getWidth() {
    return this._width;
  }

  setWidth(width) {
    this._width = width;
  }

  getHeight() {
    return this._height;
  }

  setHeight(height) {
    this._height = height;
  }

  getUnits() {
    return this._units.filter(unit => unit.getPosition());
  }

  getOtherUnits() {
    return this.getUnits().filter(unit => !(unit instanceof Warrior));
  }

  getUniqueUnits() {
    const uniqueUnits = [];
    this.getUnits().forEach(unit => {
      if (!uniqueUnits.map(uniqueUnit => uniqueUnit.constructor).includes(unit.constructor)) {
        uniqueUnits.push(unit);
      }
    });

    return uniqueUnits;
  }

  getSpaceAt(x, y) {
    return new Space(this, x, y);
  }

  getUnitAt(x, y) {
    return this.getUnits().find(unit => unit.getPosition().isAt(x, y));
  }

  addUnit(unit, x, y, direction) {
    unit.setPosition(new Position(this, x, y, direction));
    this._units.push(unit);
  }

  getStairsLocation() {
    return this._stairsLocation;
  }

  placeStairs(x, y) {
    this._stairsLocation = [x, y];
  }

  getStairsSpace() {
    return this.getSpaceAt(...this.getStairsLocation());
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this._width - 1 || y > this._height - 1;
  }
}

export default Floor;
