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
      const position = {
        x: 0,
        y: 1,
        direction: 'north',
      };
      this.floor.addUnit(unit, position);
      this.floor.getUnitAt(0, 1).should.equal(unit);
    });

    it('should not consider unit on floor if no position', function () {
      const unit = new Unit();
      const position = {
        x: 0,
        y: 1,
        direction: 'north',
      };
      this.floor.addUnit(unit, position);
      unit.position = null;
      [...this.floor.units.values()].should.not.include(unit);
    });

    it('should fetch other units not warrior', function () {
      const unit = new Unit();
      const unitPosition = {
        x: 0,
        y: 0,
        direction: 'north',
      };
      const warrior = new Warrior();
      const warriorPosition = {
        x: 1,
        y: 0,
        direction: 'north',
      };
      this.floor.addUnit(unit, unitPosition);
      this.floor.addUnit(warrior, warriorPosition);
      [...this.floor.otherUnits.values()].should.include(unit);
      [...this.floor.otherUnits.values()].should.not.include(warrior);
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
});
