import chai from 'chai';
import Look from '../../src/abilities/Look';

chai.should();

describe('Look', function () {
  beforeEach(function () {
    this.unit = {
      getPosition: this.sinon.stub().returns({ getRelativeSpace: () => null }),
      say: () => null,
    };
    this.look = new Look(this.unit);
  });

  it('should get three proxy objects at position from offset', function () {
    const expectations = this.sinon.mock(this.unit.getPosition());
    expectations.expects('getRelativeSpace').withArgs(1, 0).returns({ getPlayerObject: () => 1 });
    expectations.expects('getRelativeSpace').withArgs(2, 0).returns({ getPlayerObject: () => 2 });
    expectations.expects('getRelativeSpace').withArgs(3, 0).returns({ getPlayerObject: () => 3 });
    this.look.perform('forward').should.eql([1, 2, 3]);
    expectations.verify();
  });
});
