import chai from 'chai';
import chaiAlive from '../helpers/chaiAlive';
import Base from '../../src/units/Base';
import Walk from '../../src/abilities/Walk';
import Floor from '../../src/Floor';

const should = chai.should();
chai.use(chaiAlive);

describe('Base', function () {
  beforeEach(function () {
    this.unit = new Base();
  });

  it('should have an attack power which defaults to zero', function () {
    this.unit.getAttackPower().should.equal(0);
  });

  it('should have a shoot power which defaults to zero', function () {
    this.unit.getShootPower().should.equal(0);
  });

  it('should consider itself dead when no position', function () {
    should.equal(this.unit.getPosition(), null);
    this.unit.should.not.be.alive;
  });

  it('should consider itself alive with position', function () {
    this.unit.setPosition({});
    this.unit.should.be.alive;
  });

  it('should do nothing when earning points', function () {
    this.unit.earnPoints.bind(this.unit, 10).should.not.throw(Error);
  });

  it('should default max health to 0', function () {
    this.unit.getMaxHealth().should.equal(0);
  });

  it('should default health to max health', function () {
    this.sinon.stub(this.unit, 'getMaxHealth').returns(10);
    this.unit.getHealth().should.equal(this.unit.getMaxHealth());
  });

  it('should subtract health when taking damage', function () {
    this.sinon.stub(this.unit, 'getMaxHealth').returns(10);
    this.unit.takeDamage(3);
    this.unit.getHealth().should.equal(7);
  });

  it('should not go under zero health when taking damage', function () {
    this.sinon.stub(this.unit, 'getMaxHealth').returns(10);
    this.unit.takeDamage(11);
    this.unit.getHealth().should.equal(0);
  });

  it('should do nothing when taking damage if health isn\'t set', function () {
    this.unit.takeDamage.bind(this.unit, 3).should.not.throw(Error);
  });

  it('should set position to null when running out of health', function () {
    this.unit.setPosition({});
    this.sinon.stub(this.unit, 'getMaxHealth').returns(10);
    this.unit.takeDamage(10);
    should.equal(this.unit.getPosition(), null);
  });

  it('should return name in toString', function () {
    this.unit.getName().should.equal('Base');
    this.unit.toString().should.equal('Base');
  });

  it('should prepare turn by calling playTurn with next turn object', function () {
    this.sinon.stub(this.unit, 'getNextTurn').returns('nextTurn');
    const expectation = this.sinon.mock(this.unit).expects('playTurn').withArgs('nextTurn');
    this.unit.prepareTurn();
    expectation.verify();
  });

  it('should perform action when calling perform on turn', function () {
    this.unit.setPosition({});
    const expectation = this.sinon.mock(Walk.prototype).expects('perform').withArgs('backward');
    this.unit.addActions(['walk']);
    const turn = { getAction: this.sinon.stub().returns(['walk', ['backward']])};
    this.sinon.stub(this.unit, 'getNextTurn').returns(turn);
    this.unit.prepareTurn();
    this.unit.performTurn();
    expectation.verify();
  });

  it('should not perform action when dead (no position)', function () {
    this.unit.setPosition(null);
    this.sinon.stub(Walk.prototype, 'perform').throws('action should not be called');
    this.unit.addActions(['walk']);
    const turn = { getAction: this.sinon.stub().returns(['walk', ['backward']])};
    this.sinon.stub(this.unit, 'getNextTurn').returns(turn);
    this.unit.prepareTurn();
    this.unit.performTurn();
  });

  it('should not raise an exception when calling performTurn when there\'s no action', function () {
    this.unit.prepareTurn();
    this.unit.performTurn.bind(this.unit).should.not.throw(Error);
  });

  it('should be released from bonds when taking damage', function () {
    this.sinon.stub(this.unit, 'getMaxHealth').returns(10);
    this.unit.bind();
    this.unit.should.be.bound;
    this.unit.takeDamage(2);
    this.unit.should.not.be.bound;
  });

  it('should be released from bonds when calling release', function () {
    this.unit.bind();
    this.unit.unbind();
    this.unit.should.not.be.bound;
  });

  it('should not perform action when bound', function () {
    this.unit.setPosition({});
    this.unit.bind();
    this.sinon.stub(Walk.prototype, 'perform').throws('action should not be called');
    this.unit.addActions(['walk']);
    const turn = { getAction: this.sinon.stub().returns(['walk', ['backward']])};
    this.sinon.stub(this.unit, 'getNextTurn').returns(turn);
    this.unit.prepareTurn();
    this.unit.performTurn();
  });

  describe('with explosive', function () {
    beforeEach(function () {
      this.floor = new Floor();
      this.floor.setWidth(2);
      this.floor.setHeight(3);
      this.floor.addUnit(this.unit, 0, 0);
      this.unit.addActions(['explode']);
    });

    it('should explode when time reaches 0', function () {
      this.unit.setHealth(10);
      this.unit.getActions().explode.setTime(3);
      Array.apply(null, Array(2)).forEach(() => {
        this.unit.prepareTurn();
        this.unit.performTurn();
      });
      this.unit.getHealth().should.equal(10);
      this.unit.prepareTurn();
      this.unit.performTurn();
      this.unit.getHealth().should.equal(0);
    });
  });
});
