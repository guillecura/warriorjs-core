import chai from 'chai';
import Archer from '../../src/units/Archer';
import Ranged from '../../src/units/Ranged';

chai.should();

describe('Archer', function () {
  beforeEach(function () {
    this.archer = new Archer();
  });

  it('should be a ranged unit', function () {
    this.archer.should.be.instanceOf(Ranged);
  });

  it('should have shoot power of 3', function () {
    this.archer.getShootPower().should.equal(3);
  });

  it('should have 7 max health', function () {
    this.archer.getMaxHealth().should.equal(7);
  });
});
