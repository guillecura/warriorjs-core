import Archer from '../../src/units/Archer';
import Ranged from '../../src/units/Ranged';

describe('Archer', () => {
  const archer = new Archer();

  it('should be a ranged unit', () => {
    expect(archer).toBeInstanceOf(Ranged);
  });

  it('should have a shoot power of 3', () => {
    expect(archer.shootPower).toBe(3);
  });

  it('should have a max health of 7', () => {
    expect(archer.maxHealth).toBe(7);
  });
});
