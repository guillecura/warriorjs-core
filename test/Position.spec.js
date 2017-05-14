import Floor from '../src/Floor';
import Position from '../src/Position';
import Unit from '../src/Unit';

describe('Position', () => {
  let unit;
  let floor;
  let position;

  beforeEach(() => {
    const size = {
      height: 6,
      width: 5,
    };
    const stairs = {
      x: 0,
      y: 0,
    };
    floor = new Floor(size, stairs);
    unit = new Unit();
    floor.addUnit(unit, { x: 1, y: 2, direction: 'north' });
    position = unit.position;
  });

  it('should return a space at the same location as position', () => {
    expect(position.getSpace().getLocation()).toEqual([1, 2]);
  });

  it('should move object on floor relatively', () => {
    expect(floor.getUnitAt(1, 2)).toEqual(unit);
    position.move('backward', 1, 2);
    expect(floor.getUnitAt(1, 2)).toBeUndefined();
    expect(floor.getUnitAt(3, 3)).toEqual(unit);
    position.rotate('left');
    position.move('forward', 1);
    expect(floor.getUnitAt(3, 3)).toBeUndefined();
    expect(floor.getUnitAt(2, 3)).toEqual(unit);
  });

  it('should rotate object on floor relatively', () => {
    expect(position.direction).toEqual('north');
    ['east', 'south', 'west', 'north', 'east'].forEach((direction) => {
      position.rotate('right');
      expect(position.direction).toEqual(direction);
    });
  });

  it('should get relative space in front', () => {
    floor.addUnit(new Unit(), { x: 1, y: 1 });
    expect(position.getRelativeSpace('forward').isEmpty()).toBe(false);
  });

  it('should get relative space in front two spaces yonder', () => {
    floor.addUnit(new Unit(), { x: 1, y: 0 });
    expect(position.getRelativeSpace('forward', 2).isEmpty()).toBe(false);
  });

  it('should get relative space in front when rotated', () => {
    floor.addUnit(new Unit(), { x: 2, y: 2 });
    position.rotate('right');
    expect(position.getRelativeSpace('forward').isEmpty()).toBe(false);
  });

  it('should get relative space diagonally', () => {
    floor.addUnit(new Unit(), { x: 0, y: 1 });
    expect(position.getRelativeSpace('forward', 1, 1).isEmpty()).toBe(false);
  });

  it('should get relative space diagonally when rotated', () => {
    floor.addUnit(new Unit(), { x: 0, y: 1 });
    position.rotate('backward');
    expect(position.getRelativeSpace('forward', -1, -1).isEmpty()).toBe(false);
  });

  it('should return distance of given space', () => {
    expect(position.getDistanceOf(floor.getSpaceAt(5, 3))).toBe(5);
    expect(position.getDistanceOf(floor.getSpaceAt(4, 2))).toBe(3);
  });

  it('should return distance from stairs in both directions', () => {
    expect(position.getDistanceFromStairs()).toBe(3);
  });

  it('should return distance from stairs as zero when on stairs', () => {
    position.x = 0;
    position.y = 0;
    expect(position.getDistanceFromStairs()).toBe(0);
  });

  it('should return direction of given space', () => {
    expect(position.getDirectionOf(floor.getSpaceAt(1, 1))).toEqual('north');
    expect(position.getDirectionOf(floor.getSpaceAt(2, 2))).toEqual('east');
    expect(position.getDirectionOf(floor.getSpaceAt(1, 3))).toEqual('south');
    expect(position.getDirectionOf(floor.getSpaceAt(0, 2))).toEqual('west');
  });

  it('should return relative direction of given space', () => {
    expect(position.getRelativeDirectionOf(floor.getSpaceAt(5, 3))).toEqual('right');
    position.rotate('right');
    expect(position.getRelativeDirectionOf(floor.getSpaceAt(1, 4))).toEqual('right');
  });

  it('should return relative direction of stairs', () => {
    expect(position.getRelativeDirectionOfStairs()).toEqual('forward');
  });

  it('should be able to determine relative direction', () => {
    expect(position.getRelativeDirection('north')).toEqual('forward');
    expect(position.getRelativeDirection('south')).toEqual('backward');
    expect(position.getRelativeDirection('west')).toEqual('left');
    expect(position.getRelativeDirection('east')).toEqual('right');
    position.rotate('right');
    expect(position.getRelativeDirection('north')).toEqual('left');
    position.rotate('right');
    expect(position.getRelativeDirection('north')).toEqual('backward');
    position.rotate('right');
    expect(position.getRelativeDirection('north')).toEqual('right');
  });

  it('should have default offset for relative directions', () => {
    expect(Position.offset('forward')).toEqual([1, -0]);
    expect(Position.offset('right')).toEqual([0, 1]);
    expect(Position.offset('backward')).toEqual([-1, 0]);
    expect(Position.offset('left')).toEqual([-0, -1]);
  });

  it('should have offset for relative forward/right amounts', () => {
    expect(Position.offset('forward', 2)).toEqual([2, -0]);
    expect(Position.offset('forward', 2, 1)).toEqual([2, -1]);
    expect(Position.offset('right', 2, 1)).toEqual([1, 2]);
    expect(Position.offset('backward', 2, 1)).toEqual([-2, 1]);
    expect(Position.offset('left', 2, 1)).toEqual([-1, -2]);
  });

  it('should throw an error if direction is not recognized', () => {
    expect(() => {
      Position.verifyDirection('foo');
    }).toThrow(
      "Unknown direction: 'foo'. Should be one of: 'forward', 'right', 'backward', 'left'.",
    );
  });
});
