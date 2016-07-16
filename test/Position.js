import chai from 'chai';
import Floor from '../src/Floor';
import Unit from '../src/units/Unit';

const should = chai.should();

describe('Position', function () {
  beforeEach(function () {
    this.unit = new Unit();
    const position = {
      x: 1,
      y: 2,
      direction: 'north',
    };
    this.floor = new Floor(6, 5);
    this.floor.addUnit(this.unit, position);
    this.position = this.unit.position;
  });

  it('should rotate clockwise', function () {
    this.position.direction.should.equal('north');
    ['east', 'south', 'west', 'north', 'east'].forEach((direction) => {
      this.position.rotate(1);
      this.position.direction.should.equal(direction);
    });
  });

  it('should rotate counterclockwise', function () {
    this.position.direction.should.equal('north');
    ['west', 'south', 'east', 'north', 'west'].forEach((direction) => {
      this.position.rotate(-1);
      this.position.direction.should.equal(direction);
    });
  });

  it('should get relative space in front', function () {
    this.floor.addUnit(new Unit(), { x: 1, y: 1 });
    this.position.getRelativeSpace(1).isEmpty().should.be.false;
  });

  it('should get relative object in front when rotated', function () {
    this.floor.addUnit(new Unit(), { x: 2, y: 2 });
    this.position.rotate(1);
    this.position.getRelativeSpace(1).isEmpty().should.be.false;
  });

  it('should get relative object diagonally', function () {
    this.floor.addUnit(new Unit(), { x: 0, y: 1 });
    this.position.getRelativeSpace(1, -1).isEmpty().should.be.false;
  });

  it('should get relative object diagonally when rotating', function () {
    this.floor.addUnit(new Unit(), { x: 0, y: 1 });
    this.position.rotate(2);
    this.position.getRelativeSpace(-1, 1).isEmpty().should.be.false;
  });

  it('should move object on floor relatively', function () {
    this.floor.getUnitAt(1, 2).should.equal(this.unit);
    this.position.move(-1, 2);
    should.equal(this.floor.getUnitAt(1, 2), undefined);
    this.floor.getUnitAt(3, 3).should.equal(this.unit);
    this.position.rotate(1);
    this.position.move(-1);
    should.equal(this.floor.getUnitAt(3, 3), undefined);
    this.floor.getUnitAt(2, 3).should.equal(this.unit);
  });

  it('should return distance from stairs as 0 when on stairs', function () {
    this.floor.placeStairs(1, 2);
    this.position.getDistanceFromStairs().should.equal(0);
  });

  it('should return distance from stairs in both directions', function () {
    this.floor.placeStairs(0, 3);
    this.position.getDistanceFromStairs().should.equal(2);
  });

  it('should return relative direction of stairs', function () {
    this.floor.placeStairs(0, 0);
    this.position.getRelativeDirectionOfStairs().should.equal('forward');
  });

  it('should return relative direction of given space', function () {
    this.position.getRelativeDirectionOf(this.floor.getSpaceAt(5, 3)).should.equal('right');
    this.position.rotate(1);
    this.position.getRelativeDirectionOf(this.floor.getSpaceAt(1, 4)).should.equal('right');
  });

  it('should be able to determine relative direction', function () {
    this.position.getRelativeDirection('north').should.equal('forward');
    this.position.getRelativeDirection('south').should.equal('backward');
    this.position.getRelativeDirection('west').should.equal('left');
    this.position.getRelativeDirection('east').should.equal('right');
    this.position.rotate(1);
    this.position.getRelativeDirection('north').should.equal('left');
    this.position.rotate(1);
    this.position.getRelativeDirection('north').should.equal('backward');
    this.position.rotate(1);
    this.position.getRelativeDirection('north').should.equal('right');
  });

  it('should return a space at the same location as position', function () {
    this.position.space.location.should.eql([1, 2]);
  });

  it('should return distance of given space', function () {
    this.position.getDistanceOf(this.floor.getSpaceAt(5, 3)).should.equal(5);
    this.position.getDistanceOf(this.floor.getSpaceAt(4, 2)).should.equal(3);
  });
});
