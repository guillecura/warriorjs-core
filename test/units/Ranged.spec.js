import Ranged from '../../src/units/Ranged';

describe('Ranged', () => {
  const rangedUnit = new Ranged();

  it('should have the ability to look', () => {
    expect(rangedUnit.abilities.keys()).toContain('look');
  });

  it('should have the ability to shoot', () => {
    expect(rangedUnit.abilities.keys()).toContain('shoot');
  });
});
