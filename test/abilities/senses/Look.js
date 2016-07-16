import chai from 'chai';
import Look from '../../../src/abilities/senses/Look';

chai.should();

describe('Look', function () {
  beforeEach(function () {
    this.unit = {
      position: {
        getRelativeSpace: () => null,
      },
    };
    this.look = new Look(this.unit);
  });

  it('should get three proxy objects at position from offset', function () {
    const expectations = this.sinon.mock(this.unit.position);
    expectations.expects('getRelativeSpace').withArgs(1, 0).returns({ toPlayerObject: () => 1 });
    expectations.expects('getRelativeSpace').withArgs(2, 0).returns({ toPlayerObject: () => 2 });
    expectations.expects('getRelativeSpace').withArgs(3, 0).returns({ toPlayerObject: () => 3 });
    this.look.perform('forward').should.eql([1, 2, 3]);
    expectations.verify();
  });
});
