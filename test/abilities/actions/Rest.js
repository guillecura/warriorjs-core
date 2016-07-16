import chai from 'chai';
import Rest from '../../../src/abilities/actions/Rest';
import Warrior from '../../../src/units/Warrior';

chai.should();

describe('Rest', function () {
  beforeEach(function () {
    this.warrior = new Warrior();
    this.rest = new Rest(this.warrior);
  });

  it('should give 10% health back', function () {
    this.warrior.health = 10;
    this.rest.perform();
    this.warrior.health.should.equal(12);
  });

  it('should not add health when at max', function () {
    this.warrior.health = 20;
    this.rest.perform();
    this.warrior.health.should.equal(20);
  });

  it('should not go over max health', function () {
    this.warrior.health = 19;
    this.rest.perform();
    this.warrior.health.should.equal(20);
  });
});
