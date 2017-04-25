import Floor from '../src/Floor';
import Space from '../src/Space';
import Unit from '../src/units/Unit';
import Warrior from '../src/units/Warrior';

describe('Floor', () => {
  let floor;

  beforeEach(() => {
    floor = new Floor(2, 3);
  });

  it('should be able to add a unit and fetch it at that position', () => {
    const unit = new Unit();
    floor.addUnit(unit, 0, 1, 'north');
    expect(floor.getUnitAt(0, 1)).toBe(unit);
  });

  it('should not consider unit on floor if no position', () => {
    const unit = new Unit();
    floor.addUnit(unit, 0, 1, 'north');
    unit.position = null;
    expect(floor.units).not.toContain(unit);
  });

  it('should fetch other units not warrior', () => {
    const unit = new Unit();
    const warrior = new Warrior();
    floor.addUnit(unit, 0, 0, 'north');
    floor.addUnit(warrior, 1, 0, 'north');
    expect(floor.otherUnits).toContain(unit);
    expect(floor.otherUnits).not.toContain(warrior);
  });

  it('should return unique units', () => {
    const unit = new Unit();
    floor.addUnit(unit, 0, 0);
    floor.addUnit(new Unit(), 1, 0);
    expect(floor.uniqueUnits).toEqual([unit]);
  });

  it('should not consider corners out of bounds', () => {
    expect(floor.isOutOfBounds(0, 0)).toBe(false);
    expect(floor.isOutOfBounds(1, 0)).toBe(false);
    expect(floor.isOutOfBounds(1, 2)).toBe(false);
    expect(floor.isOutOfBounds(0, 2)).toBe(false);
  });

  it('should consider out of bounds when going beyond sides', () => {
    expect(floor.isOutOfBounds(-1, 0)).toBe(true);
    expect(floor.isOutOfBounds(0, -1)).toBe(true);
    expect(floor.isOutOfBounds(0, 3)).toBe(true);
    expect(floor.isOutOfBounds(2, 0)).toBe(true);
  });

  it('should return space at the specified location', () => {
    expect(floor.getSpaceAt(0, 0)).toBeInstanceOf(Space);
  });

  it('should place stairs and be able to fetch the location', () => {
    floor.placeStairs(1, 2);
    expect(floor.stairsLocation).toEqual([1, 2]);
  });
});
