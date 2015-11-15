import chai from 'chai';
import sinon from 'sinon';
import Shoot from '../../src/abilities/actions/Shoot';

chai.should();

describe('Shoot', function () {
  beforeEach(function () {
    this.shooter = {
      getPosition: this.sinon.stub().returns({ getRelativeSpace: () => null }),
      getShootPower: this.sinon.stub().returns(2),
      say: () => null,
    };
    this.shoot = new Shoot(this.shooter);
  });

  it('should shoot only first unit', function () {
    const receiver = {
      isAlive: this.sinon.stub().returns(true),
      takeDamage: () => null,
    };
    const other = {
      isAlive: this.sinon.stub().returns(true),
      takeDamage: () => null,
    };
    const receiverExpectation = this.sinon.mock(receiver).expects('takeDamage').withArgs(2);
    const otherExpectation = this.sinon.mock(other).expects('takeDamage').never();
    const shootExpectation = this.sinon.mock(this.shoot).expects('getUnits').withArgs('forward', sinon.match.any).returns([receiver, other]);
    this.shoot.perform();
    receiverExpectation.verify();
    otherExpectation.verify();
    shootExpectation.verify();
  });

  it('should shoot and do nothing if no units in the way', function () {
    const expectation = this.sinon.mock(this.shoot).expects('getUnits').withArgs('forward', sinon.match.any).returns([null, null]);
    this.shoot.perform.bind(this.shoot).should.not.throw(Error);
    expectation.verify();
  });
});
