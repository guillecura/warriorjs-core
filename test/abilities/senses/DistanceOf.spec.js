import DistanceOf from '../../../src/abilities/senses/DistanceOf';

describe('Distance of', () => {
  it('should return distance from given space', () => {
    const unit = {
      position: {
        getDistanceOf: () => 5,
      },
    };
    const distanceOf = new DistanceOf(unit);
    expect(distanceOf.perform('space')).toEqual(5);
  });
});
