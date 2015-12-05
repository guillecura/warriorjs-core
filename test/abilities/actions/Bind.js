import chai from 'chai';
import chaiBound from '../../helpers/chaiBound';
import Bind from '../../../src/abilities/actions/Bind';
import Unit from '../../../src/units/Unit';

chai.should();
chai.use(chaiBound);

describe('Bind', function () {
  beforeEach(function () {
    const unit = {
      say: () => null,
    };
    this.bind = new Bind(unit);
  });

  it('should bind receiver', function () {
    const receiver = new Unit();
    this.sinon.stub(this.bind, '_getUnit').returns(receiver);
    this.bind.perform();
    receiver.should.be.bound;
  });

  it('should do nothing if no recipient', function () {
    this.sinon.stub(this.bind, '_getUnit').returns(null);
    this.bind.perform.bind(this.bind).should.not.throw(Error);
  });
});
