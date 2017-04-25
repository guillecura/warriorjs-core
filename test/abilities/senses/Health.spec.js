import Health from '../../../src/abilities/senses/Health';
import Warrior from '../../../src/units/Warrior';

describe('Health', () => {
  it('should return the amount of health', () => {
    const warrior = new Warrior();
    const health = new Health(warrior);
    warrior.health = 10;
    expect(health.perform()).toBe(10);
  });
});
