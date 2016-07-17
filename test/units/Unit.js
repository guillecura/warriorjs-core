import chai from 'chai';
import times from 'lodash.times';
import chaiAlive from '../helpers/chaiAlive';
import Walk from '../../src/abilities/actions/Walk';
import Explode from '../../src/abilities/actions/Explode';
import Unit from '../../src/units/Unit';
import Floor from '../../src/Floor';

const should = chai.should();
chai.use(chaiAlive);

describe('Unit', function () {
  beforeEach(function () {
    this.unit = new Unit();
  });

  it('should have an attack power which defaults to zero', function () {
    this.unit.attackPower.should.equal(0);
  });

  it('should have a shoot power which defaults to zero', function () {
    this.unit.shootPower.should.equal(0);
  });

  it('should consider itself dead when no position', function () {
    should.equal(this.unit.position, null);
    this.unit.should.not.be.alive;
  });

  it('should consider itself alive with position', function () {
    this.unit.position = {};
    this.unit.should.be.alive;
  });

  it('should do nothing when earning points', function () {
    this.unit.earnPoints.bind(this.unit, 10).should.not.throw(Error);
  });

  it('should default max health to 0', function () {
    this.unit.maxHealth.should.equal(0);
  });

  it('should default health to max health', function () {
    this.unit._maxHealth = 10;
    this.unit.health.should.equal(this.unit.maxHealth);
  });

  it('should subtract health when taking damage', function () {
    this.unit._maxHealth = 10;
    this.unit.takeDamage(3);
    this.unit.health.should.equal(7);
  });

  it('should not go under zero health when taking damage', function () {
    this.unit._maxHealth = 10;
    this.unit.takeDamage(11);
    this.unit.health.should.equal(0);
  });

  it('should do nothing when taking damage if health isn\'t set', function () {
    this.unit.takeDamage.bind(this.unit, 3).should.not.throw(Error);
  });

  it('should set position to null when running out of health', function () {
    this.unit.position = {};
    this.unit._maxHealth = 10;
    this.unit.takeDamage(10);
    should.equal(this.unit.position, null);
  });

  it('should return name in toString', function () {
    this.unit.name.should.equal('Unit');
    this.unit.toString().should.equal('Unit');
  });

  it('should prepare turn by calling playTurn with next turn object', function () {
    this.sinon.stub(this.unit, '_nextTurn').returns('nextTurn');
    const expectation = this.sinon.mock(this.unit).expects('playTurn').withArgs('nextTurn');
    this.unit.prepareTurn();
    expectation.verify();
  });

  it('should perform action when calling perform on turn', function () {
    this.unit.position = {};
    const expectation = this.sinon.mock(Walk.prototype).expects('perform').withArgs('backward');
    this.unit.abilities.set('walk', new Walk(this.unit));
    const turn = {
      action: ['walk', ['backward']],
    };
    this.sinon.stub(this.unit, '_nextTurn').returns(turn);
    this.unit.prepareTurn();
    this.unit.performTurn();
    expectation.verify();
  });

  it('should not perform action when dead (no position)', function () {
    this.unit.position = null;
    this.sinon.stub(Walk.prototype, 'perform').throws('action should not be called');
    this.unit.abilities.walk = new Walk(this.unit);
    const turn = {
      action: ['walk', ['backward']],
    };
    this.sinon.stub(this.unit, '_nextTurn').returns(turn);
    this.unit.prepareTurn();
    this.unit.performTurn();
  });

  it('should not raise an exception when calling performTurn when there\'s no action', function () {
    this.unit.prepareTurn();
    this.unit.performTurn.bind(this.unit).should.not.throw(Error);
  });

  it('should be released from bonds when taking damage', function () {
    this.unit._maxHealth = 10;
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
    this.unit.position = {};
    this.unit.bind();
    this.sinon.stub(Walk.prototype, 'perform').throws('action should not be called');
    this.unit.abilities.walk = new Walk(this.unit);
    const turn = {
      action: ['walk', ['backward']],
    };
    this.sinon.stub(this.unit, '_nextTurn').returns(turn);
    this.unit.prepareTurn();
    this.unit.performTurn();
  });

  describe('with explosive', function () {
    beforeEach(function () {
      this.floor = new Floor(2, 3);
      this.floor.addUnit(this.unit, { x: 0, y: 0 });
      this.explodeTime = 3;
      this.unit.abilities.set('explode', new Explode(this.unit, this.explodeTime));
    });

    it('should explode when time reaches 0', function () {
      this.unit.health = 10;
      times(this.explodeTime - 1, () => {
        this.unit.prepareTurn();
        this.unit.performTurn();
      });
      this.unit.health.should.equal(10);
      this.unit.prepareTurn();
      this.unit.performTurn();
      this.unit.health.should.equal(0);
    });
  });
});
