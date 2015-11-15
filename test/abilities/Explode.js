import _ from 'lodash';
import chai from 'chai';
import Explode from '../../src/abilities/actions/Explode';
import Unit from '../../src/units/Unit';
import Captive from '../../src/units/Captive';
import Floor from '../../src/Floor';

chai.should();

describe('Explode', function () {
  beforeEach(function () {
    this.floor = new Floor();
    this.floor.setWidth(2);
    this.floor.setHeight(3);
    this.captive = new Captive();
    this.floor.addUnit(this.captive, 0, 0);
    this.explode = new Explode(this.captive);
  });

  it('should subtract 100 health from each unit on the floor', function () {
    const unit = new Unit();
    unit.setHealth(101);
    this.floor.addUnit(unit, 0, 1);
    this.captive.setHealth(10);
    this.explode.perform();
    this.captive.getHealth().should.equal(0);
    unit.getHealth().should.equal(1);
  });

  it('should explode when bomb time reaches zero', function () {
    this.captive.setHealth(10);
    this.explode.setTime(3);
    _.times(2, () => this.explode.passTurn());
    this.captive.getHealth().should.equal(10);
    this.explode.passTurn();
    this.captive.getHealth().should.equal(0);
  });
});
