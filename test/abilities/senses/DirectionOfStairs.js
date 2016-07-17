import chai from 'chai';
import DirectionOfStairs from '../../../src/abilities/senses/DirectionOfStairs';

chai.should();

describe('Direction of stairs', function () {
  beforeEach(function () {
    this.unit = {
      position: {
        getRelativeDirectionOfStairs: () => null,
      },
    };
    this.directionOfStairs = new DirectionOfStairs(this.unit);
  });

  it('should return relative direction of stairs', function () {
    this.sinon.stub(this.unit.position, 'getRelativeDirectionOfStairs').returns('left');
    this.directionOfStairs.perform().should.equal('left');
  });
});
