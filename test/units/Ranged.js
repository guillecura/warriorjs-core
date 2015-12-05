import chai from 'chai';
import Ranged from '../../src/units/Ranged';

chai.should();

describe('Ranged', function () {
  beforeEach(function () {
    this.rangedUnit = new Ranged();
  });

  it('should have look sense', function () {
    this.rangedUnit.abilities.should.include.key('look');
  });

  it('should have shoot action', function () {
    this.rangedUnit.abilities.should.include.key('shoot');
  });
});
