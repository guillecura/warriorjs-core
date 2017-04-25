import Melee from '../../src/units/Melee';

describe('Melee', () => {
  const meleeUnit = new Melee();

  it('should have the ability to feel', () => {
    expect(meleeUnit.abilities).toHaveProperty('feel');
  });

  it('should have the ability to attach', () => {
    expect(meleeUnit.abilities).toHaveProperty('attack');
  });
});
