import chai from 'chai';
import DirectionOfStairs from '../../src/abilities/DirectionOfStairs';

chai.should();

describe('Direction of stairs', function () {
  beforeEach(function () {
    this.unit = {
      getPosition: this.sinon.stub().returns({ getRelativeDirectionOfStairs: () => null }),
      say: () => null,
    };
    this.directionOfStairs = new DirectionOfStairs(this.unit);
  });

  it('should return relative direction of stairs', function () {
    this.sinon.stub(this.unit.getPosition(), 'getRelativeDirectionOfStairs').returns('left');
    this.directionOfStairs.perform().should.equal('left');
  });
});
