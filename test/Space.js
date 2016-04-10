import chai from 'chai';
import chaiWarrior from './helpers/chaiWarrior';
import chaiEnemy from './helpers/chaiEnemy';
import chaiCaptive from './helpers/chaiCaptive';
import chaiWall from './helpers/chaiWall';
import chaiStairs from './helpers/chaiStairs';
import chaiPlayer from './helpers/chaiPlayer';
import chaiTicking from './helpers/chaiTicking';
import Explode from '../src/abilities/actions/Explode';
import Floor from '../src/Floor';
import Warrior from '../src/units/Warrior';
import Sludge from '../src/units/Sludge';
import Captive from '../src/units/Captive';

const should = chai.should();
chai.use(chaiWarrior);
chai.use(chaiEnemy);
chai.use(chaiCaptive);
chai.use(chaiWall);
chai.use(chaiStairs);
chai.use(chaiPlayer);
chai.use(chaiTicking);

describe('Space', function () {
  beforeEach(function () {
    this.floor = new Floor(2, 3);
  });

  describe('with empty space', function () {
    beforeEach(function () {
      this.space = this.floor.getSpaceAt(0, 0);
    });

    it('should not be enemy', function () {
      this.space.should.not.be.enemy;
    });

    it('should not be warrior', function () {
      this.space.should.not.be.warrior;
    });

    it('should be empty', function () {
      this.space.isEmpty().should.be.true;
    });

    it('should not be wall', function () {
      this.space.should.not.be.wall;
    });

    it('should not be stairs', function () {
      this.space.should.not.be.stairs;
    });

    it('should not be captive', function () {
      this.space.should.not.be.captive;
    });

    it('should say \'nothing\' as name', function () {
      this.space.toString().should.equal('nothing');
    });

    it('should not be ticking', function () {
      this.space.should.not.be.ticking;
    });
  });

  describe('out of bounds', function () {
    beforeEach(function () {
      this.space = this.floor.getSpaceAt(-1, 1);
    });

    it('should be wall', function () {
      this.space.should.be.wall;
    });

    it('should not be empty', function () {
      this.space.isEmpty().should.be.false;
    });

    it('should have name of \'wall\'', function () {
      this.space.toString().should.equal('wall');
    });
  });

  describe('with warrior', function () {
    beforeEach(function () {
      this.floor.addUnit(new Warrior(), 0, 0);
      this.space = this.floor.getSpaceAt(0, 0);
    });

    it('should be warrior', function () {
      this.space.should.be.warrior;
    });

    it('should be player', function () {
      this.space.should.be.player;
    });

    it('should not be enemy', function () {
      this.space.should.not.be.enemy;
    });

    it('should not be empty', function () {
      this.space.should.not.be.empty;
    });

    it('should know what unit is on that space', function () {
      this.space.unit.should.be.instanceOf(Warrior);
    });
  });

  describe('with enemy', function () {
    beforeEach(function () {
      this.floor.addUnit(new Sludge(), 0, 0);
      this.space = this.floor.getSpaceAt(0, 0);
    });

    it('should be enemy', function () {
      this.space.should.be.enemy;
    });

    it('should not be warrior', function () {
      this.space.should.not.be.warrior;
    });

    it('should not be empty', function () {
      this.space.should.not.be.empty;
    });

    it('should have name of unit', function () {
      this.space.toString().should.equal('Sludge');
    });

    describe('bound', function () {
      beforeEach(function () {
        this.space.unit.bind();
      });

      it('should be captive', function () {
        this.space.should.be.captive;
      });

      it('should not look like enemy', function () {
        this.space.should.not.be.enemy;
      });
    });
  });

  describe('with captive', function () {
    beforeEach(function () {
      this.captive = new Captive();
      this.floor.addUnit(this.captive, 0, 0);
      this.space = this.floor.getSpaceAt(0, 0);
    });

    it('should be captive', function () {
      this.space.should.be.captive;
    });

    it('should not be enemy', function () {
      this.space.should.not.be.enemy;
    });

    it('should be ticking if captive has time bomb', function () {
      this.captive.abilities.explode = new Explode(this.captive);
      this.space.should.be.ticking;
    });

    it('should not be ticking if captive does not have time bomb', function () {
      this.space.should.not.be.ticking;
    });
  });

  describe('player object', function () {
    beforeEach(function () {
      this.space = this.floor.getSpaceAt(0, 0);
      this.playerObject = this.space.toPlayerObject();
    });

    it('should be able to call informational methods', function () {
      this.playerObject.isWall.bind(this.space).should.not.throw(Error);
      this.playerObject.isWarrior.bind(this.space).should.not.throw(Error);
      this.playerObject.isEnemy.bind(this.space).should.not.throw(Error);
      this.playerObject.isEmpty.bind(this.space).should.not.throw(Error);
    });

    it('should not be able to access restricted properties', function () {
      should.equal(this.playerObject.location, undefined);
      should.equal(this.playerObject.unit, undefined);
      should.equal(this.playerObject._floor, undefined);
      should.equal(this.playerObject._x, undefined);
      should.equal(this.playerObject._y, undefined);
    });
  });
});
