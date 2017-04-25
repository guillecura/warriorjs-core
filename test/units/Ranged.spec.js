import Ranged from '../../src/units/Ranged';

describe('Ranged', () => {
  const rangedUnit = new Ranged();

  it('should have the ability to look', () => {
    expect(rangedUnit.abilities).toHaveProperty('look');
  });

  it('should have the ability to shoot', () => {
    expect(rangedUnit.abilities).toHaveProperty('shoot');
  });
});
