import Shoot from '../../../src/abilities/actions/Shoot';
import Unit from '../../../src/units/Unit';

describe('Shoot', () => {
  let shoot;
  let shooter;

  beforeEach(() => {
    shooter = new Unit();
    shooter.shootPower = 2;
    shooter.say = () => {};
    shoot = new Shoot(shooter);
  });

  it('should shoot only first unit', () => {
    const receiver = {
      isAlive: () => true,
      say: () => {},
      takeDamage: jest.fn(),
    };
    const other = {
      isAlive: () => true,
      say: () => {},
      takeDamage: jest.fn(),
    };
    shoot.getUnits = () => [receiver, other];
    shoot.perform();
    expect(receiver.takeDamage.mock.calls[0][0]).toBe(2);
    expect(other.takeDamage.mock.calls.length).toBe(0);
  });

  it('should shoot and do nothing if no units in the way', () => {
    shoot.getUnits = () => [];
    expect(() => {
      shoot.perform();
    }).not.toThrow();
  });
});
