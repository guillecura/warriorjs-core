import Rest from '../../../src/abilities/actions/Rest';
import Warrior from '../../../src/units/Warrior';

describe('Rest', () => {
  let rest;
  let warrior;

  beforeEach(() => {
    warrior = new Warrior();
    warrior.say = () => {};
    rest = new Rest(warrior);
  });

  it('should give 10% of max health back', () => {
    warrior.health = 10;
    rest.perform();
    expect(warrior.getHealth()).toBe(12);
  });

  it('should not add health when at max', () => {
    warrior.health = 20;
    rest.perform();
    expect(warrior.getHealth()).toBe(20);
  });

  it('should not go over max health', () => {
    warrior.health = 19;
    rest.perform();
    expect(warrior.getHealth()).toBe(20);
  });
});
