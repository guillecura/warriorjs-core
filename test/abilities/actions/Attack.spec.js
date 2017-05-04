import Attack from '../../../src/abilities/actions/Attack';
import Unit from '../../../src/units/Unit';

describe('Attack', () => {
  let attack;
  let attacker;
  let receiver;

  beforeEach(() => {
    attacker = new Unit();
    attacker.attackPower = 3;
    attacker.say = () => {};
    attack = new Attack(attacker);
    receiver = new Unit();
    receiver.position = {};
    receiver.maxHealth = 5;
    receiver.say = () => {};
    attacker.position = {
      getRelativeSpace: () => ({
        getUnit: () => receiver,
      }),
    };
  });

  it('should subtract attack power amount from health', () => {
    attack.perform();
    expect(receiver.getHealth()).toBe(2);
  });

  it('should reduce attack power when attacking backward', () => {
    attack.perform('backward');
    expect(receiver.getHealth()).toBe(3);
  });

  it('should award points equal to max health when killing unit', () => {
    attacker.earnPoints = jest.fn();
    receiver.health = 3;
    attack.perform();
    expect(attacker.earnPoints.mock.calls[0][0]).toBe(5);
  });

  it('should not award points when not killing unit', () => {
    attacker.earnPoints = jest.fn();
    attack.perform();
    expect(attacker.earnPoints.mock.calls.length).toBe(0);
  });

  it('should do nothing if no recipient', () => {
    attack.getUnit = () => undefined;
    expect(() => {
      attack.perform();
    }).not.toThrow();
  });
});
