import Attack from '../../../src/abilities/actions/Attack';
import Unit from '../../../src/units/Unit';

describe('Attack', () => {
  let attack;
  let attacker;
  let receiver;

  beforeEach(() => {
    attacker = {
      attackPower: 3,
      say: () => {},
    };
    attack = new Attack(attacker);
    receiver = new Unit();
    receiver.position = {};
    attack._getUnit = jest.fn().mockReturnValue(receiver);
  });

  it('should subtract attack power amount from health', () => {
    receiver._maxHealth = 5;
    attack.perform();
    expect(receiver.health).toBe(2);
  });

  it('should reduce attack power when attacking backward', () => {
    receiver._maxHealth = 5;
    attack.perform('backward');
    expect(receiver.health).toBe(3);
  });

  it('should award points when killing unit', () => {
    attacker.earnPoints = jest.fn();
    receiver._maxHealth = 3;
    attack.perform();
    expect(attacker.earnPoints.mock.calls[0][0]).toBe(3);
  });

  it('should not award points when not killing unit', () => {
    attacker.earnPoints = jest.fn();
    receiver._maxHealth = 5;
    attack.perform();
    expect(attacker.earnPoints.mock.calls.length).toBe(0);
  });

  it('should do nothing if no recipient', () => {
    attack._getUnit = jest.fn().mockReturnValue(null);
    expect(() => {
      attack.perform();
    }).not.toThrow();
  });
});
