import chai from 'chai';
import Feel from '../../src/abilities/senses/Feel';

chai.should();

describe('Feel', function () {
  beforeEach(function () {
    this.unit = {
      getPosition: this.sinon.stub().returns({ getRelativeSpace: () => null }),
      say: () => null,
    };
    this.feel = new Feel(this.unit);
  });

  it('should get object at position from offset', function () {
    const expectation = this.sinon.mock(this.unit.getPosition()).expects('getRelativeSpace').withArgs(1, 0).returns({ getPlayerObject: () => null });
    this.feel.perform('forward');
    expectation.verify();
  });
});
