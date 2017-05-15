import Floor from '../src/Floor';
import Space from '../src/Space';
import Unit from '../src/Unit';

describe('Floor', () => {
  let floor;

  beforeEach(() => {
    const size = {
      height: 3,
      width: 2,
    };
    const stairs = {
      x: 1,
      y: 2,
    };
    floor = new Floor(size, stairs);
  });

  it('should be able to add a unit and fetch it at that position', () => {
    const unit = new Unit();
    floor.addUnit(unit, { x: 0, y: 1 });
    expect(floor.getUnitAt(0, 1)).toBe(unit);
  });

  it('should not consider unit on floor if no position', () => {
    const unit = new Unit();
    floor.addUnit(unit, { x: 0, y: 1 });
    unit.position = null;
    expect(floor.getUnits()).not.toContain(unit);
  });

  it('should fetch warrior', () => {
    const warrior = new Unit('Warrior');
    floor.addUnit(warrior, { x: 1, y: 0 });
    expect(floor.getWarrior()).toBe(warrior);
  });

  it('should not fetch warrior when fetching other units', () => {
    const unit = new Unit();
    const warrior = new Unit('Warrior');
    floor.addUnit(unit, { x: 0, y: 0 });
    floor.addUnit(warrior, { x: 1, y: 0 });
    expect(floor.getOtherUnits()).toContain(unit);
    expect(floor.getOtherUnits()).not.toContain(warrior);
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

  it('should be able to fetch the stairs location', () => {
    expect(floor.stairsLocation).toEqual([1, 2]);
  });
});
