import chai from 'chai';
import chaiBound from '../helpers/chaiBound';
import Captive from '../../src/units/Captive';

chai.should();
chai.use(chaiBound);

describe('Captive', function () {
  beforeEach(function () {
    this.captive = new Captive();
  });

  it('should have 1 max health', function () {
    this.captive.getMaxHealth().should.equal(1);
  });

  it('should be bound by default', function () {
    this.captive.should.be.bound;
  });
});
