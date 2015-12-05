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
    this.warrior.name.should.equal('Warrior');
    this.warrior.name = '';
    this.warrior.name.should.equal('Warrior');
  });

  it('should be able to set name', function () {
    this.warrior.name = 'Joe';
    this.warrior.name.should.equal('Joe');
    this.warrior.toString().should.equal('Joe');
  });

  it('should have 20 max health', function () {
    this.warrior.maxHealth.should.equal(20);
  });

  it('should have 0 score at beginning and be able to earn points', function () {
    this.warrior.score.should.equal(0);
    this.warrior.earnPoints(5);
    this.warrior.score.should.equal(5);
  });

  it('should call player.playTurn and pass turn to player', function () {
    const player = new Player();
    const turn = {
      toPlayerObject() {
        return 'turn';
      },
    };
    const expectation = this.sinon.mock(player).expects('playTurn').withArgs('turn');
    this.warrior._player = player;
    this.warrior.playTurn(turn);
    expectation.verify();
  });

  it('should have an attack power of 5', function () {
    this.warrior.attackPower.should.equal(5);
  });

  it('should have an shoot power of 3', function () {
    this.warrior.shootPower.should.equal(3);
  });
});
