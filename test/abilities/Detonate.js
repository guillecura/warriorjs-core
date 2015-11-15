import chai from 'chai';
import Detonate from '../../src/abilities/actions/Detonate';
import Unit from '../../src/units/Unit';
import Warrior from '../../src/units/Warrior';
import Captive from '../../src/units/Captive';
import Floor from '../../src/Floor';

chai.should();

describe('Detonate', function () {
  beforeEach(function () {
    this.floor = new Floor();
    this.floor.setWidth(2);
    this.floor.setHeight(3);
    this.warrior = new Warrior();
    this.floor.addUnit(this.warrior, 0, 0, 'south');
    this.detonate = new Detonate(this.warrior);
  });

  it('should subtract 8 from forward unit and 4 from surrounding units', function () {
    const targetUnit = new Unit();
    targetUnit.setHealth(15);
    const secondUnit = new Unit();
    secondUnit.setHealth(15);
    this.floor.addUnit(targetUnit, 0, 1);
    this.floor.addUnit(secondUnit, 1, 1);
    this.detonate.perform();
    targetUnit.getHealth().should.equal(7);
    secondUnit.getHealth().should.equal(11);
  });

  it('should subtract 8 from forward unit and 4 from surrounding units', function () {
    const targetUnit = new Unit();
    targetUnit.setHealth(15);
    const secondUnit = new Unit();
    secondUnit.setHealth(15);
    this.floor.addUnit(targetUnit, 1, 0);
    this.floor.addUnit(secondUnit, 1, 1);
    this.detonate.perform('left');
    targetUnit.getHealth().should.equal(7);
    secondUnit.getHealth().should.equal(11);
  });

  it('should detonate an explosive if any unit has one', function () {
    const captive = new Captive();
    captive.setHealth(1);
    captive.addAbilities({ explode: [] });
    this.floor.addUnit(captive, 1, 1);
    this.detonate.perform();
    captive.getHealth().should.equal(0);
    this.warrior.getHealth().should.equal(0);
  });
});
