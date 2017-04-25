import DirectionOf from '../../../src/abilities/senses/DirectionOf';

describe('Direction of', () => {
  it('should return relative direction of given space', () => {
    const unit = {
      position: {
        getRelativeDirectionOf: () => 'left',
      },
    };
    const directionOf = new DirectionOf(unit);
    expect(directionOf.perform('space')).toEqual('left');
  });
});
