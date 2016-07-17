import chai from 'chai';
import Attack from '../../../src/abilities/actions/Attack';
import Unit from '../../../src/units/Unit';

chai.should();

describe('Attack', function () {
  beforeEach(function () {
    this.attacker = {
      position: {
        getRelativeSpace: () => null,
      },
      attackPower: 3,
      earnPoints: () => null,
      toViewObject: () => null,
    };
    this.attack = new Attack(this.attacker);
  });

  it('should subtract attack power amount from health', function () {
    const receiver = new Unit();
    this.sinon.stub(receiver, 'isAlive').returns(true);
    receiver.health = 5;
    this.sinon.stub(this.attack, '_getUnit').returns(receiver);
    this.attack.perform();
    receiver.health.should.equal(2);
  });

  it('should do nothing if recipient is null', function () {
    this.sinon.stub(this.attack, '_getUnit').returns(null);
    this.attack.perform.bind(this.attack).should.not.throw(Error);
  });

  it('should get object at position from offset', function () {
    const expectation = this.sinon
      .mock(this.attacker.position)
      .expects('getRelativeSpace')
      .withArgs(1, 0);
    this.attack._getSpace('forward');
    expectation.verify();
  });

  it('should award points when killing unit', function () {
    const receiver = {
      maxHealth: 8,
      isAlive: () => false,
      takeDamage: () => null,
    };
    this.sinon.stub(this.attack, '_getUnit').returns(receiver);
    const expectation = this.sinon.mock(this.attacker).expects('earnPoints').withArgs(8);
    this.attack.perform();
    expectation.verify();
  });

  it('should not award points when not killing unit', function () {
    const receiver = {
      maxHealth: 8,
      isAlive: () => true,
      takeDamage: () => null,
    };
    this.sinon.stub(this.attack, '_getUnit').returns(receiver);
    const expectation = this.sinon.mock(this.attacker).expects('earnPoints').never();
    this.attack.perform();
    expectation.verify();
  });

  it('should reduce attack power when attacking backward', function () {
    const receiver = new Unit();
    this.sinon.stub(receiver, 'isAlive').returns(true);
    receiver.health = 5;
    this.sinon.stub(this.attack, '_getUnit').returns(receiver);
    this.attack.perform('backward');
    receiver.health.should.equal(3);
  });
});
