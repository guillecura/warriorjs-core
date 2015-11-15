import chai from 'chai';
import Walk from '../../src/abilities/actions/Walk';

chai.should();

describe('Walk', function () {
  beforeEach(function () {
    this.space = {
      isEmpty: this.sinon.stub().returns(true),
      getUnit: this.sinon.stub().returns(null),
    };
    this.position = {
      getRelativeSpace: () => this.space,
      move: () => null,
    };
    this.walk = new Walk({
      getPosition: () => this.position,
      say: () => null,
    });
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
    this.space.isEmpty.returns(false);
    this.walk.perform.bind(this.walk, 'right').should.not.throw(Error);
    expectation.verify();
  });
});
