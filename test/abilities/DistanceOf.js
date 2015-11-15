import chai from 'chai';
import DistanceOf from '../../src/abilities/senses/DistanceOf';

chai.should();

describe('Distance of', function () {
  beforeEach(function () {
    this.unit = {
      getPosition: this.sinon.stub().returns({ getDistanceOf: () => null }),
      say: () => null,
    };
    this.distanceOf = new DistanceOf(this.unit);
  });

  it('should return distance from given space', function () {
    this.sinon.stub(this.unit.getPosition(), 'getDistanceOf').withArgs('space').returns(5);
    this.distanceOf.perform('space').should.equal(5);
  });
});
