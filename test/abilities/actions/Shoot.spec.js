import Shoot from '../../../src/abilities/actions/Shoot';

describe('Shoot', () => {
  let shoot;
  let shooter;

  beforeEach(() => {
    shooter = {
      shootPower: 2,
      say: () => {},
    };
    shoot = new Shoot(shooter);
  });

  it('should shoot only first unit', () => {
    const receiver = {
      isAlive: () => true,
      takeDamage: jest.fn(),
    };
    const other = {
      isAlive: () => true,
      takeDamage: jest.fn(),
    };
    shoot.getUnits = jest.fn().mockReturnValue([receiver, other]);
    shoot.perform();
    expect(receiver.takeDamage.mock.calls[0][0]).toBe(2);
    expect(other.takeDamage.mock.calls.length).toBe(0);
  });

  it('should shoot and do nothing if no units in the way', () => {
    shoot.getUnits = jest.fn().mockReturnValue([]);
    expect(() => {
      shoot.perform();
    }).not.toThrow();
  });
});
