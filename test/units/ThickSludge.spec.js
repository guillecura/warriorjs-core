import Sludge from '../../src/units/Sludge';
import ThickSludge from '../../src/units/ThickSludge';

describe('ThickSludge', () => {
  const thickSludge = new ThickSludge();

  it('should be a kind of Sludge', () => {
    expect(thickSludge).toBeInstanceOf(Sludge);
  });

  it('should have a max health of 24', () => {
    expect(thickSludge.maxHealth).toBe(24);
  });

  it('should have the name of "Thick Sludge"', () => {
    expect(thickSludge.name).toEqual('Thick Sludge');
  });
});
