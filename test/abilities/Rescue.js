import chai from 'chai';
import chaiBound from '../helpers/chaiBound';
import Rescue from '../../src/abilities/Rescue';
import Warrior from '../../src/units/Warrior';
import Captive from '../../src/units/Captive';
import Base from '../../src/units/Base';

const should = chai.should();
chai.use(chaiBound);

describe('Rescue', function () {
  beforeEach(function () {
    this.warrior = new Warrior();
    this.rescue = new Rescue(this.warrior);
  });

  it('should rescue captive', function () {
    const captive = new Captive();
    captive.setPosition({});
    this.sinon.mock(this.rescue).expects('getSpace').withArgs('forward').returns({ isCaptive: this.sinon.stub().returns(true) });
    this.sinon.mock(this.rescue).expects('getUnit').withArgs('forward').returns(captive);
    const expectation = this.sinon.mock(this.warrior).expects('earnPoints').withArgs(20);
    this.rescue.perform();
    should.equal(captive.getPosition(), null);
    expectation.verify();
  });

  it('should do nothing to other unit if not bound', function () {
    const unit = new Base();
    unit.setPosition({});
    this.sinon.mock(this.rescue).expects('getSpace').withArgs('forward').returns({ isCaptive: this.sinon.stub().returns(false) });
    this.sinon.mock(this.rescue).expects('getUnit').withArgs('forward').never();
    const expectation = this.sinon.mock(this.warrior).expects('earnPoints').never();
    this.rescue.perform();
    unit.getPosition().should.not.be.null;
    expectation.verify();
  });

  it('should release other unit when bound', function () {
    const unit = new Base();
    unit.bind();
    unit.setPosition({});
    this.sinon.mock(this.rescue).expects('getSpace').withArgs('forward').returns({ isCaptive: this.sinon.stub().returns(true) });
    this.sinon.mock(this.rescue).expects('getUnit').withArgs('forward').returns(unit);
    const expectation = this.sinon.mock(this.warrior).expects('earnPoints').never();
    this.rescue.perform();
    unit.should.not.be.bound;
    unit.getPosition().should.not.be.null;
    expectation.verify();
  });
});
