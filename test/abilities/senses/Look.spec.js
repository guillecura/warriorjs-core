import Look from '../../../src/abilities/senses/Look';

describe('Look', () => {
  it('should get three proxy objects at position from offset', () => {
    const unit = {
      position: {
        getRelativeSpace: jest.fn(),
      },
    };
    const look = new Look(unit);
    unit.position.getRelativeSpace
      .mockReturnValueOnce({ toPlayerObject: () => 1 })
      .mockReturnValueOnce({ toPlayerObject: () => 2 })
      .mockReturnValueOnce({ toPlayerObject: () => 3 });
    expect(look.perform('forward')).toEqual([1, 2, 3]);
  });
});
