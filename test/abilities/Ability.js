import chai from 'chai';
import Ability from '../../src/abilities/Ability';

const should = chai.should();

describe('Ability', function () {
  beforeEach(function () {
    this.ability = new Ability();
  });

  it('should have offset for directions', function () {
    this.ability._offset('forward').should.eql([1, -0]);
    this.ability._offset('right').should.eql([0, 1]);
    this.ability._offset('backward').should.eql([-1, 0]);
    this.ability._offset('left').should.eql([-0, -1]);
  });

  it('should have offset for relative forward/right amounts', function () {
    this.ability._offset('forward', 2).should.eql([2, -0]);
    this.ability._offset('forward', 2, 1).should.eql([2, -1]);
    this.ability._offset('right', 2, 1).should.eql([1, 2]);
    this.ability._offset('backward', 2, 1).should.eql([-2, 1]);
    this.ability._offset('left', 2, 1).should.eql([-1, -2]);
  });

  it('should fetch unit at given direction with distance', function () {
    this.sinon
      .mock(this.ability)
      .expects('_getSpace')
      .withArgs('right', 3, 1)
      .returns({ unit: 'unit' });
    this.ability._getUnit('right', 3, 1).should.equal('unit');
  });

  it('should have no description', function () {
    should.equal(this.ability.description, undefined);
  });

  it('should throw an error if direction isn\'t recognized', function () {
    this.ability._verifyDirection.bind(this.ability, 'foo').should.throw(
      Error,
      'Unknown direction \'foo\'. Should be one of: \'forward\', \'right\', \'backward\', \'left\'.'
    );
  });
});
