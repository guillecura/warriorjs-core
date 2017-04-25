import DirectionOfStairs from '../../../src/abilities/senses/DirectionOfStairs';

describe('Direction of stairs', () => {
  it('should return relative direction of stairs', () => {
    const unit = {
      position: {
        getRelativeDirectionOfStairs: () => 'left',
      },
    };
    const directionOfStairs = new DirectionOfStairs(unit);
    expect(directionOfStairs.perform()).toEqual('left');
  });
});
