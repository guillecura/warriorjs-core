import chai from 'chai';
import Detonate from '../../../src/abilities/actions/Detonate';
import Explode from '../../../src/abilities/actions/Explode';
import Unit from '../../../src/units/Unit';
import Warrior from '../../../src/units/Warrior';
import Captive from '../../../src/units/Captive';
import Floor from '../../../src/Floor';

chai.should();

describe('Detonate', function () {
  beforeEach(function () {
    this.floor = new Floor(2, 3);
    this.warrior = new Warrior();
    this.floor.addUnit(this.warrior, 0, 0, 'south');
    this.detonate = new Detonate(this.warrior);
  });

  it('should subtract 8 from forward unit and 4 from surrounding units', function () {
    const targetUnit = new Unit();
    targetUnit.health = 15;
    const secondUnit = new Unit();
    secondUnit.health = 15;
    this.floor.addUnit(targetUnit, 0, 1);
    this.floor.addUnit(secondUnit, 1, 1);
    this.detonate.perform();
    targetUnit.health.should.equal(7);
    secondUnit.health.should.equal(11);
  });

  it('should subtract 8 from forward unit and 4 from surrounding units', function () {
    const targetUnit = new Unit();
    targetUnit.health = 15;
    const secondUnit = new Unit();
    secondUnit.health = 15;
    this.floor.addUnit(targetUnit, 1, 0);
    this.floor.addUnit(secondUnit, 1, 1);
    this.detonate.perform('left');
    targetUnit.health.should.equal(7);
    secondUnit.health.should.equal(11);
  });

  it('should detonate an explosive if any unit has one', function () {
    const captive = new Captive();
    captive.health = 1;
    captive.abilities.explode = new Explode(captive);
    this.floor.addUnit(captive, 1, 1);
    this.detonate.perform();
    captive.health.should.equal(0);
    this.warrior.health.should.equal(0);
  });
});
