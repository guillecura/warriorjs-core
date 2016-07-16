import chai from 'chai';
import chaiPassed from './helpers/chaiPassed';
import Floor from '../src/Floor';
import Level from '../src/Level';
import Unit from '../src/units/Unit';
import Warrior from '../src/units/Warrior';

chai.should();
chai.use(chaiPassed);

describe('Level', function () {
  beforeEach(function () {
    this.floor = new Floor(0, 0);
    this.level = new Level();
    this.level.floor = this.floor;
    this.sinon.stub(this.level, '_failed').returns(false);
    this.level.warrior = { score: () => null };
  });

  it('should consider passed when warrior is on stairs', function () {
    this.level.warrior = new Warrior();
    const position = {
      x: 0,
      y: 0,
      direction: 'north',
    };
    this.floor.addUnit(this.level.warrior, position);
    this.floor.placeStairs(0, 0);
    this.level.should.be.passed;
  });

  it('should default time bonus to zero', function () {
    this.level.timeBonus.should.equal(0);
  });

  describe('playing', function () {
    it('should call prepareTurn and playTurn on each unit specified number of times', function () {
      const unit = new Unit();
      const position = {
        x: 0,
        y: 0,
        direction: 'north',
      };
      const mock = this.sinon.mock(unit);
      const expectationOne = mock.expects('prepareTurn').twice();
      const expectationTwo = mock.expects('performTurn').twice();
      this.floor.addUnit(unit, position);
      this.level.play(2);
      expectationOne.verify();
      expectationTwo.verify();
    });

    it('should return immediately when passed', function () {
      const unit = new Unit();
      const position = {
        x: 0,
        y: 0,
        direction: 'north',
      };
      const expectation = this.sinon.mock(unit).expects('performTurn').never();
      this.floor.addUnit(unit, position);
      this.sinon.stub(this.level, '_passed').returns(true);
      this.level.play(2);
      expectation.verify();
    });

    it('should count down time bonus once each turn', function () {
      this.level.timeBonus = 10;
      this.level.play(3);
      this.level.timeBonus.should.equal(7);
    });

    it('should not count down time bonus below 0', function () {
      this.level.timeBonus = 2;
      this.level.play(5);
      this.level.timeBonus.should.equal(0);
    });
  });
});
