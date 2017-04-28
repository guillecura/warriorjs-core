import Health from '../../../src/abilities/senses/Health';
import Warrior from '../../../src/units/Warrior';

describe('Health', () => {
  it('should return the amount of health', () => {
    const warrior = new Warrior();
    warrior.health = 10;
    const health = new Health(warrior);
    expect(health.perform()).toBe(10);
  });
});
