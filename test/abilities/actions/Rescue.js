import chai from 'chai';
import chaiBound from '../../helpers/chaiBound';
import Rescue from '../../../src/abilities/actions/Rescue';
import Warrior from '../../../src/units/Warrior';
import Captive from '../../../src/units/Captive';
import Unit from '../../../src/units/Unit';

const should = chai.should();
chai.use(chaiBound);

describe('Rescue', function () {
  beforeEach(function () {
    this.warrior = new Warrior();
    this.sinon.stub(this.warrior, 'say', () => null);
    this.rescue = new Rescue(this.warrior);
  });

  it('should rescue captive', function () {
    const captive = new Captive();
    this.sinon.stub(captive, 'say', () => null);
    captive.position = {};
    this.sinon
      .mock(this.rescue)
      .expects('_getSpace')
      .withArgs('forward')
      .returns({ isCaptive: this.sinon.stub().returns(true) });
    this.sinon
      .mock(this.rescue)
      .expects('_getUnit')
      .withArgs('forward')
      .returns(captive);
    const expectation = this.sinon.mock(this.warrior).expects('earnPoints').withArgs(20);
    this.rescue.perform();
    should.equal(captive.position, null);
    expectation.verify();
  });

  it('should do nothing to other unit if not bound', function () {
    const unit = new Unit();
    this.sinon.stub(unit, 'say', () => null);
    unit.position = {};
    this.sinon
      .mock(this.rescue)
      .expects('_getSpace')
      .withArgs('forward')
      .returns({ isCaptive: this.sinon.stub().returns(false) });
    this.sinon
      .mock(this.rescue)
      .expects('_getUnit')
      .withArgs('forward')
      .never();
    const expectation = this.sinon.mock(this.warrior).expects('earnPoints').never();
    this.rescue.perform();
    unit.position.should.not.be.null;
    expectation.verify();
  });

  it('should release other unit when bound', function () {
    const unit = new Unit();
    this.sinon.stub(unit, 'say', () => null);
    unit.bind();
    unit.position = {};
    this.sinon
      .mock(this.rescue)
      .expects('_getSpace')
      .withArgs('forward')
      .returns({ isCaptive: this.sinon.stub().returns(true) });
    this.sinon
      .mock(this.rescue)
      .expects('_getUnit')
      .withArgs('forward')
      .returns(unit);
    const expectation = this.sinon.mock(this.warrior).expects('earnPoints').never();
    this.rescue.perform();
    unit.should.not.be.bound;
    unit.position.should.not.be.null;
    expectation.verify();
  });
});
