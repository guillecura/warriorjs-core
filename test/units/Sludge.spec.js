import Sludge from '../../src/units/Sludge';
import Melee from '../../src/units/Melee';

describe('Sludge', () => {
  const sludge = new Sludge();

  it('should be a melee unit', () => {
    expect(sludge).toBeInstanceOf(Melee);
  });

  it('should have an attack power of 3', () => {
    expect(sludge.attackPower).toBe(3);
  });

  it('should have a max health of 12', () => {
    expect(sludge.maxHealth).toBe(12);
  });
});
