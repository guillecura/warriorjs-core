import chai from 'chai';
import Attack from '../../src/abilities/actions/Attack';
import Unit from '../../src/units/Unit';

chai.should();

describe('Attack', function () {
  beforeEach(function () {
    this.attacker = {
      getPosition: this.sinon.stub().returns({ getRelativeSpace: () => null }),
      getAttackPower: this.sinon.stub().returns(3),
      earnPoints: () => null,
      say: () => null,
    };
    this.attack = new Attack(this.attacker);
  });

  it('should subtract attack power amount from health', function () {
    const receiver = new Unit();
    this.sinon.stub(receiver, 'isAlive').returns(true);
    receiver.setHealth(5);
    this.sinon.stub(this.attack, 'getUnit').returns(receiver);
    this.attack.perform();
    receiver.getHealth().should.equal(2);
  });

  it('should do nothing if recipient is null', function () {
    this.sinon.stub(this.attack, 'getUnit').returns(null);
    this.attack.perform.bind(this.attack).should.not.throw(Error);
  });

  it('should get object at position from offset', function () {
    const expectation = this.sinon.mock(this.attacker.getPosition()).expects('getRelativeSpace').withArgs(1, 0);
    this.attack.getSpace('forward');
    expectation.verify();
  });

  it('should award points when killing unit', function () {
    const receiver = {
      takeDamage: this.sinon.stub().returns(null),
      getMaxHealth: this.sinon.stub().returns(8),
      isAlive: this.sinon.stub().returns(false),
    };
    this.sinon.stub(this.attack, 'getUnit').returns(receiver);
    const expectation = this.sinon.mock(this.attacker).expects('earnPoints').withArgs(8);
    this.attack.perform();
    expectation.verify();
  });

  it('should not award points when not killing unit', function () {
    const receiver = {
      takeDamage: this.sinon.stub().returns(null),
      getMaxHealth: this.sinon.stub().returns(8),
      isAlive: this.sinon.stub().returns(true),
    };
    this.sinon.stub(this.attack, 'getUnit').returns(receiver);
    const expectation = this.sinon.mock(this.attacker).expects('earnPoints').never();
    this.attack.perform();
    expectation.verify();
  });

  it('should reduce attack power when attacking backward', function () {
    const receiver = new Unit();
    this.sinon.stub(receiver, 'isAlive').returns(true);
    receiver.setHealth(5);
    this.sinon.stub(this.attack, 'getUnit').returns(receiver);
    this.attack.perform('backward');
    receiver.getHealth().should.equal(3);
  });
});
