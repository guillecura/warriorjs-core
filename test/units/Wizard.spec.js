import Wizard from '../../src/units/Wizard';
import Ranged from '../../src/units/Ranged';

describe('Wizard', () => {
  const wizard = new Wizard();

  it('should be a ranged unit', () => {
    expect(wizard).toBeInstanceOf(Ranged);
  });

  it('should have a shoot power of 11', () => {
    expect(wizard.shootPower).toBe(11);
  });

  it('should have a max health of 3', () => {
    expect(wizard.maxHealth).toBe(3);
  });
});
