import Ability from '../../src/abilities/Ability';

describe('Ability', () => {
  let ability;

  beforeEach(() => {
    ability = new Ability();
  });

  it('should have no description', () => {
    expect(ability.description).toBeUndefined();
  });

  it('should have offset for directions', () => {
    expect(ability._offset('forward')).toEqual([1, -0]);
    expect(ability._offset('right')).toEqual([0, 1]);
    expect(ability._offset('backward')).toEqual([-1, 0]);
    expect(ability._offset('left')).toEqual([-0, -1]);
  });

  it('should have offset for relative forward/right amounts', () => {
    expect(ability._offset('forward', 2)).toEqual([2, -0]);
    expect(ability._offset('forward', 2, 1)).toEqual([2, -1]);
    expect(ability._offset('right', 2, 1)).toEqual([1, 2]);
    expect(ability._offset('backward', 2, 1)).toEqual([-2, 1]);
    expect(ability._offset('left', 2, 1)).toEqual([-1, -2]);
  });

  it('should get object at position from offset', () => {
    const unit = {
      position: {
        getRelativeSpace: jest.fn(),
      },
    };
    ability._unit = unit;
    ability._getSpace('forward');
    expect(unit.position.getRelativeSpace.mock.calls[0]).toEqual([1, -0]);
  });

  it('should fetch unit at given direction with distance', () => {
    ability._getSpace = jest.fn().mockReturnValue({ unit: 'unit' });
    expect(ability._getUnit('right', 3, 1)).toEqual('unit');
  });

  it('should throw an error if direction is not recognized', () => {
    expect(() => {
      ability._verifyDirection('foo');
    }).toThrow(
      "Unknown direction 'foo'. Should be one of: 'forward', 'right', 'backward', 'left'.",
    );
  });
});