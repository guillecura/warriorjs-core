import chai from 'chai';
import DirectionOf from '../../../src/abilities/senses/DirectionOf';

chai.should();

describe('Direction of', function () {
  beforeEach(function () {
    this.unit = {
      position: {
        getRelativeDirectionOf: () => null,
      },
      say: () => null,
    };
    this.directionOf = new DirectionOf(this.unit);
  });

  it('should return relative direction of given space', function () {
    this.sinon.stub(this.unit.position, 'getRelativeDirectionOf').withArgs('space').returns('left');
    this.directionOf.perform('space').should.equal('left');
  });
});