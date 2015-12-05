import chai from 'chai';
import chaiOutOfBounds from './helpers/chaiOutOfBounds';
import Floor from '../src/Floor';
import Space from '../src/Space';
import Unit from '../src/units/Unit';
import Warrior from '../src/units/Warrior';

chai.should();
chai.use(chaiOutOfBounds);

describe('Floor', function () {
  describe('2x3', function () {
    beforeEach(function () {
      this.floor = new Floor(2, 3);
    });

    it('should be able to add a unit and fetch it at that position', function () {
      const unit = new Unit();
      this.floor.addUnit(unit, 0, 1, 'north');
      this.floor.getUnitAt(0, 1).should.equal(unit);
    });

    it('should not consider unit on floor if no position', function () {
      const unit = new Unit();
      this.floor.addUnit(unit, 0, 1, 'north');
      unit.position = null;
      this.floor.units.should.not.include(unit);
    });

    it('should fetch other units not warrior', function () {
      const unit = new Unit();
      const warrior = new Warrior();
      this.floor.addUnit(unit, 0, 0, 'north');
      this.floor.addUnit(warrior, 1, 0, 'north');
      this.floor.otherUnits.should.include(unit);
      this.floor.otherUnits.should.not.include(warrior);
    });

    it('should not consider corners out of bounds', function () {
      this.floor.should.not.be.outOfBounds(0, 0);
      this.floor.should.not.be.outOfBounds(1, 0);
      this.floor.should.not.be.outOfBounds(1, 2);
      this.floor.should.not.be.outOfBounds(0, 2);
    });

    it('should consider out of bounds when going beyond sides', function () {
      this.floor.should.be.outOfBounds(-1, 0);
      this.floor.should.be.outOfBounds(0, -1);
      this.floor.should.be.outOfBounds(0, 3);
      this.floor.should.be.outOfBounds(2, 0);
    });

    it('should return space at the specified location', function () {
      this.floor.getSpaceAt(0, 0).should.be.instanceOf(Space);
    });

    it('should place stairs and be able to fetch the location', function () {
      this.floor.placeStairs(1, 2);
      this.floor.stairsLocation.should.eql([1, 2]);
    });
  });

  describe('3x1', function () {
    beforeEach(function () {
      this.floor = new Floor(3, 1);
    });

    it('should return unique units', function () {
      const unit = new Unit();
      this.floor.addUnit(unit, 0, 0);
      this.floor.addUnit(new Unit(), 1, 0);
      this.floor.uniqueUnits.should.eql([unit]);
    });
  });
});
