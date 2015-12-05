import chai from 'chai';
import ThickSludge from '../../src/units/ThickSludge';
import Sludge from '../../src/units/Sludge';

chai.should();

describe('ThickSludge', function () {
  beforeEach(function () {
    this.thickSludge = new ThickSludge();
  });

  it('should be a kind of Sludge', function () {
    this.thickSludge.should.be.instanceOf(Sludge);
  });

  it('should have 24 max health', function () {
    this.thickSludge.maxHealth.should.equal(24);
  });

  it('should have the name of \'Thick Sludge\'', function () {
    this.thickSludge.name.should.equal('Thick Sludge');
  });
});
