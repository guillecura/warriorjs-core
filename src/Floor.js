import Position from './Position';
import Space from './Space';

export default class Floor {
  constructor(size, stairs) {
    this.width = size.width;
    this.height = size.height;
    this.stairsLocation = [stairs.x, stairs.y];
    this.units = [];
  }

  isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
  }

  getSpaceAt(x, y) {
    return new Space(this, x, y);
  }

  getStairsSpace() {
    return this.getSpaceAt(...this.stairsLocation);
  }

  addUnit(unit, { x, y, direction }) {
    const positionedUnit = unit;
    positionedUnit.position = new Position(this, x, y, direction);
    this.units.push(positionedUnit);
  }

  getUnits() {
    return this.units.filter(unit => unit.position);
  }

  getUnitAt(x, y) {
    return this.getUnits().find(unit => unit.position.isAt(x, y));
  }

  getWarrior() {
    return this.getUnits().find(unit => unit.type === 'Warrior');
  }

  getOtherUnits() {
    return this.getUnits().filter(unit => unit.type !== 'Warrior');
  }
}
