import chai from 'chai';
import Rest from '../../src/abilities/Rest';
import Warrior from '../../src/units/Warrior';

chai.should();

describe('Rest', function () {
  beforeEach(function () {
    this.warrior = new Warrior();
    this.rest = new Rest(this.warrior);
  });

  it('should give 10% health back', function () {
    this.sinon.stub(this.warrior, 'getMaxHealth').returns(20);
    this.warrior.setHealth(10);
    this.rest.perform();
    this.warrior.getHealth().should.equal(12);
  });

  it('should not add health when at max', function () {
    this.sinon.stub(this.warrior, 'getMaxHealth').returns(20);
    this.warrior.setHealth(20);
    this.rest.perform();
    this.warrior.getHealth().should.equal(20);
  });

  it('should not go over max health', function () {
    this.sinon.stub(this.warrior, 'getMaxHealth').returns(20);
    this.warrior.setHealth(19);
    this.rest.perform();
    this.warrior.getHealth().should.equal(20);
  });
});
