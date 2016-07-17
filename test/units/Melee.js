import chai from 'chai';
import Melee from '../../src/units/Melee';

chai.should();

describe('Melee', function () {
  beforeEach(function () {
    this.meleeUnit = new Melee();
  });

  it('should have feel sense', function () {
    [...this.meleeUnit.abilities.keys()].should.include('feel');
  });

  it('should have attack action', function () {
    [...this.meleeUnit.abilities.keys()].should.include('attack');
  });
});
