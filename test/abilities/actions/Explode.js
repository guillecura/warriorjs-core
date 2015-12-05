import chai from 'chai';
import times from 'lodash.times';
import Explode from '../../../src/abilities/actions/Explode';
import Unit from '../../../src/units/Unit';
import Captive from '../../../src/units/Captive';
import Floor from '../../../src/Floor';

chai.should();

describe('Explode', function () {
  beforeEach(function () {
    this.floor = new Floor(2, 3);
    this.captive = new Captive();
    this.floor.addUnit(this.captive, 0, 0);
    this.explode = new Explode(this.captive, 3);
  });

  it('should subtract 100 health from each unit on the floor', function () {
    const unit = new Unit();
    unit.health = 101;
    this.floor.addUnit(unit, 0, 1);
    this.captive.health = 10;
    this.explode.perform();
    this.captive.health.should.equal(0);
    unit.health.should.equal(1);
  });

  it('should explode when bomb time reaches zero', function () {
    this.captive.health = 10;
    times(2, () => this.explode.passTurn());
    this.captive.health.should.equal(10);
    this.explode.passTurn();
    this.captive.health.should.equal(0);
  });
});
