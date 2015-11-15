import Position from './Position';
import Space from './Space';
import Warrior from './units/Warrior';

class Floor {
  _width = 0;
  _height = 0;
  _stairsLocation = [-1, -1];
  _units = [];

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

  getStairsLocation() {
    return this._stairsLocation;
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

  placeStairs(x, y) {
    this._stairsLocation = [x, y];
  }

  getStairsSpace() {
    return this.getSpaceAt(...this.getStairsLocation());
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this._width - 1 || y > this._height - 1;
  }

  toViewObject() {
    return {
      width: this.getWidth(),
      height: this.getHeight(),
      units: this.getUnits().map((unit) => unit.toViewObject()),
      stairsLocation: this.getStairsLocation(),
    };
  }
}

export default Floor;
