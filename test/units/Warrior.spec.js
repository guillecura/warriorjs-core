import Warrior from '../../src/units/Warrior';

describe('Warrior', () => {
  const warrior = new Warrior();

  it('should have an attack power of 5', () => {
    expect(warrior.attackPower).toBe(5);
  });

  it('should have a shoot power of 3', () => {
    expect(warrior.shootPower).toBe(3);
  });

  it('should have a max health of 20', () => {
    expect(warrior.maxHealth).toBe(20);
  });

  it('should default name to Warrior', () => {
    expect(warrior.getName()).toEqual('Warrior');
    warrior.name = '';
    expect(warrior.getName()).toEqual('Warrior');
  });

  it('should be able to set name', () => {
    warrior.name = 'Joe';
    expect(warrior.name).toEqual('Joe');
  });

  it('should start with a score of zero', () => {
    expect(warrior.score).toBe(0);
  });

  it('should be able to earn points', () => {
    warrior.earnPoints(5);
    expect(warrior.score).toBe(5);
  });

  it('should call player.playTurn and pass turn to player', () => {
    const player = {
      playTurn: jest.fn(),
    };
    const turn = {
      toPlayerObject() {
        return 'turn';
      },
    };
    warrior.player = player;
    warrior.playTurn(turn);
    expect(player.playTurn.mock.calls[0][0]).toEqual('turn');
  });
});
