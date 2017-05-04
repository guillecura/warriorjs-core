import Feel from '../../../src/abilities/senses/Feel';

describe('Feel', () => {
  it('should get object at position from offset', () => {
    const unit = {
      position: {
        getRelativeSpace: jest.fn().mockReturnValue({
          toPlayerObject: () => {},
        }),
      },
    };
    const feel = new Feel(unit);
    feel.perform('forward');
    expect(unit.position.getRelativeSpace.mock.calls[0]).toEqual(['forward']);
  });
});
