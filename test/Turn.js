import chai from 'chai';
import Turn from '../src/Turn';
import Feel from '../src/abilities/senses/Feel';

const should = chai.should();

describe('Turn', function () {
  beforeEach(function () {
    this.feel = new Feel({});
    this.sinon.stub(this.feel, '_getSpace').returns({ toPlayerObject: () => null });
    this.turn = new Turn({
      walk: null,
      attack: null,
      feel: this.feel,
    });
  });

  describe('with actions', function () {
    it('should have no action performed at first', function () {
      should.equal(this.turn.action, null);
    });

    it('should be able to perform action and recall it', function () {
      this.turn.walk();
      this.turn.action.should.eql(['walk', []]);
    });

    it('should include arguments passed to action', function () {
      this.turn.walk('forward');
      this.turn.action.should.eql(['walk', ['forward']]);
    });

    it('should not be able to call multiple actions per turn', function () {
      this.turn.walk();
      this.turn.attack.bind(this.turn).should.throw(
        Error, 'Only one action can be performed per turn.'
      );
    });
  });

  describe('with senses', function () {
    it('should be able to call multiple senses per turn', function () {
      this.turn.feel();
      this.turn.feel.bind(this.turn, 'backward').should.not.throw(Error);
      should.equal(this.turn.action, null);
    });
  });

  describe('player object', function () {
    beforeEach(function () {
      this.playerObject = this.turn.toPlayerObject();
    });

    it('should be able to call actions and senses', function () {
      this.playerObject.feel.bind(this.turn).should.not.throw(Error);
      this.playerObject.attack.bind(this.turn).should.not.throw(Error);
    });

    it('should not be able to access restricted properties', function () {
      should.equal(this.playerObject._addAction, undefined);
      should.equal(this.playerObject._addSense, undefined);
      should.equal(this.playerObject.action, undefined);
      should.equal(this.playerObject._action, undefined);
      should.equal(this.playerObject._senses, undefined);
    });
  });
});
