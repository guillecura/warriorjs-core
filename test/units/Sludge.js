import chai from 'chai';
import Sludge from '../../src/units/Sludge';
import Melee from '../../src/units/Melee';

chai.should();

describe('Sludge', function () {
  beforeEach(function () {
    this.sludge = new Sludge();
  });

  it('should be a melee unit', function () {
    this.sludge.should.be.instanceOf(Melee);
  });

  it('should have attack power of 3', function () {
    this.sludge.getAttackPower().should.equal(3);
  });

  it('should have 12 max health', function () {
    this.sludge.getMaxHealth().should.equal(12);
  });
});
