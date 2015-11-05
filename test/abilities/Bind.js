import chai from 'chai';
import chaiBound from '../helpers/chaiBound';
import Bind from '../../src/abilities/Bind';
import Base from '../../src/units/Base';

chai.should();
chai.use(chaiBound);

describe('Bind', function () {
  beforeEach(function () {
    this.bind = new Bind({ say: () => null });
  });

  it('should bind receiver', function () {
    const receiver = new Base();
    this.sinon.stub(this.bind, 'getUnit').returns(receiver);
    this.bind.perform();
    receiver.should.be.bound;
  });

  it('should do nothing if no recipient', function () {
    this.sinon.stub(this.bind, 'getUnit').returns(null);
    this.bind.perform.bind(this.bind).should.not.throw(Error);
  });
});
