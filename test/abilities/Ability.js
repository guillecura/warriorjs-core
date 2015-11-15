import chai from 'chai';
import Ability from '../../src/abilities/Ability';

const should = chai.should();

describe('Ability', function () {
  beforeEach(function () {
    this.ability = new Ability();
  });

  it('should have offset for directions', function () {
    this.ability.offset('forward').should.eql([1, -0]);
    this.ability.offset('right').should.eql([0, 1]);
    this.ability.offset('backward').should.eql([-1, 0]);
    this.ability.offset('left').should.eql([-0, -1]);
  });

  it('should have offset for relative forward/right amounts', function () {
    this.ability.offset('forward', 2).should.eql([2, -0]);
    this.ability.offset('forward', 2, 1).should.eql([2, -1]);
    this.ability.offset('right', 2, 1).should.eql([1, 2]);
    this.ability.offset('backward', 2, 1).should.eql([-2, 1]);
    this.ability.offset('left', 2, 1).should.eql([-1, -2]);
  });

  it('should fetch unit at given direction with distance', function () {
    this.sinon.mock(this.ability).expects('getSpace').withArgs('right', 3, 1).returns({ getUnit: this.sinon.stub().returns('unit') });
    this.ability.getUnit('right', 3, 1).should.equal('unit');
  });

  it('should have no description', function () {
    should.equal(this.ability.getDescription(), undefined);
  });

  it('should throw an error if direction isn\'t recognized', function () {
    this.ability.verifyDirection.bind(this.ability, 'foo').should.throw(Error, 'Unknown direction \'foo\'');
  });
});
