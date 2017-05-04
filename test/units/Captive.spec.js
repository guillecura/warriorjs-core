import Captive from '../../src/units/Captive';

describe('Captive', () => {
  const captive = new Captive();

  it('should have a max health of 1', () => {
    expect(captive.maxHealth).toBe(1);
  });

  it('should be bound by default', () => {
    expect(captive.isBound()).toBe(true);
  });
});
