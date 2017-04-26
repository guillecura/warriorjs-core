import Melee from '../../src/units/Melee';

describe('Melee', () => {
  const meleeUnit = new Melee();

  it('should have the ability to feel', () => {
    expect(meleeUnit.abilities.keys()).toContain('feel');
  });

  it('should have the ability to attach', () => {
    expect(meleeUnit.abilities.keys()).toContain('attack');
  });
});
