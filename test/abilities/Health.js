import chai from 'chai';
import Health from '../../src/abilities/senses/Health';
import Warrior from '../../src/units/Warrior';

chai.should();

describe('Health', function () {
  beforeEach(function () {
    this.warrior = new Warrior();
    this.health = new Health(this.warrior);
  });

  it('should return the amount of health', function () {
    this.warrior.setHealth(10);
    this.health.perform().should.equal(10);
  });
});
