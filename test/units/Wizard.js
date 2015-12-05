import chai from 'chai';
import Wizard from '../../src/units/Wizard';
import Ranged from '../../src/units/Ranged';

chai.should();

describe('Wizard', function () {
  beforeEach(function () {
    this.wizard = new Wizard();
  });

  it('should be a ranged unit', function () {
    this.wizard.should.be.instanceOf(Ranged);
  });

  it('should have shoot power of 11', function () {
    this.wizard.shootPower.should.equal(11);
  });

  it('should have 3 max health', function () {
    this.wizard.maxHealth.should.equal(3);
  });
});
