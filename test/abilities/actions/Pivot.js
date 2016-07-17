import chai from 'chai';
import Pivot from '../../../src/abilities/actions/Pivot';

chai.should();

describe('Pivot', function () {
  beforeEach(function () {
    this.position = {
      getRelativeSpace: () => null,
      rotate: () => null,
    };
    this.pivot = new Pivot({
      position: this.position,
      toViewObject: () => null,
    });
  });

  it('should flip around when not passing arguments', function () {
    const expectation = this.sinon.mock(this.position).expects('rotate').withArgs(2);
    this.pivot.perform();
    expectation.verify();
  });

  it('should rotate right when pivoting right', function () {
    const expectation = this.sinon.mock(this.position).expects('rotate').withArgs(1);
    this.pivot.perform('right');
    expectation.verify();
  });
});
