import chai from 'chai';
import Feel from '../../../src/abilities/senses/Feel';

chai.should();

describe('Feel', function () {
  beforeEach(function () {
    this.unit = {
      position: {
        getRelativeSpace: () => null,
      },
    };
    this.feel = new Feel(this.unit);
  });

  it('should get object at position from offset', function () {
    const expectation = this.sinon
      .mock(this.unit.position)
      .expects('getRelativeSpace')
      .withArgs(1, 0)
      .returns({ toPlayerObject: () => null });
    this.feel.perform('forward');
    expectation.verify();
  });
});
