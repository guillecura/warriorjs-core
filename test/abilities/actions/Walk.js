import chai from 'chai';
import Walk from '../../../src/abilities/actions/Walk';

chai.should();

describe('Walk', function () {
  beforeEach(function () {
    this.space = {
      unit: null,
      isEmpty: () => true,
    };
    this.position = {
      getRelativeSpace: () => this.space,
      move: () => null,
    };
    const unit = {
      position: this.position,
      isAlive: () => true,
      say: () => null,
    };
    this.walk = new Walk(unit);
  });

  it('should move position forward when calling perform', function () {
    const expectation = this.sinon.mock(this.position).expects('move').withArgs(1, 0);
    this.walk.perform();
    expectation.verify();
  });

  it('should move position right if that is direction', function () {
    const expectation = this.sinon.mock(this.position).expects('move').withArgs(0, 1);
    this.walk.perform('right');
    expectation.verify();
  });

  it('should keep position if something is in the way', function () {
    const expectation = this.sinon.mock(this.position).expects('move').never();
    this.space.isEmpty = () => false;
    this.walk.perform.bind(this.walk, 'right').should.not.throw(Error);
    expectation.verify();
  });
});
