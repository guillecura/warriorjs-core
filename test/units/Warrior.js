import chai from 'chai';
import Warrior from '../../src/units/Warrior';

chai.should();

class Player {
  playTurn() {
  }
}

describe('Warrior', function () {
  beforeEach(function () {
    this.warrior = new Warrior();
  });

  it('should default name to Warrior', function () {
    this.warrior.getName().should.equal('Warrior');
    this.warrior.setName('');
    this.warrior.getName().should.equal('Warrior');
  });

  it('should be able to set name', function () {
    this.warrior.setName('Joe');
    this.warrior.getName().should.equal('Joe');
    this.warrior.toString().should.equal('Joe');
  });

  it('should have 20 max health', function () {
    this.warrior.getMaxHealth().should.equal(20);
  });

  it('should have 0 score at beginning and be able to earn points', function () {
    this.warrior.getScore().should.equal(0);
    this.warrior.earnPoints(5);
    this.warrior.getScore().should.equal(5);
  });

  it('should call player.playTurn and pass turn to player', function () {
    const player = new Player();
    const turn = { getPlayerObject: () => 'turn' };
    const expectation = this.sinon.mock(player).expects('playTurn').withArgs('turn');
    this.sinon.stub(this.warrior, 'getPlayer').returns(player);
    this.warrior.playTurn(turn);
    expectation.verify();
  });

  it('should have an attack power of 5', function () {
    this.warrior.getAttackPower().should.equal(5);
  });

  it('should have an shoot power of 3', function () {
    this.warrior.getShootPower().should.equal(3);
  });
});
