import chai from 'chai';
import Listen from '../../src/abilities/Listen';
import Base from '../../src/units/Base';
import Warrior from '../../src/units/Warrior';
import Floor from '../../src/Floor';

chai.should();

describe('Listen', function () {
  beforeEach(function () {
    this.floor = new Floor();
    this.floor.setWidth(2);
    this.floor.setHeight(3);
    this.warrior = new Warrior();
    this.floor.addUnit(this.warrior, 0, 0);
    this.listen = new Listen(this.warrior);
  });

  it('should return an array of spaces which have units on them besides main unit', function () {
    this.floor.addUnit(new Base(), 0, 1);
    this.listen.perform().should.have.length(1);
  });
});
