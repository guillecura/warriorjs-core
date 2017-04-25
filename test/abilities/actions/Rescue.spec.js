import Captive from '../../../src/units/Captive';
import Rescue from '../../../src/abilities/actions/Rescue';
import Unit from '../../../src/units/Unit';
import Warrior from '../../../src/units/Warrior';

describe('Rescue', () => {
  let rescue;
  let warrior;

  beforeEach(() => {
    warrior = new Warrior();
    warrior.say = () => {};
    warrior.earnPoints = jest.fn();
    rescue = new Rescue(warrior);
  });

  it('should rescue captive', () => {
    const captive = new Captive();
    captive.position = {};
    captive.say = () => {};
    rescue._getSpace = jest.fn().mockReturnValue({
      isCaptive: jest.fn().mockReturnValue(true),
    });
    rescue._getUnit = jest.fn().mockReturnValue(captive);
    rescue.perform();
    expect(captive.position).toBeNull();
    expect(warrior.earnPoints.mock.calls[0][0]).toBe(20);
  });

  it('should release other unit when bound', () => {
    const unit = new Unit();
    unit.position = {};
    unit.say = () => {};
    unit.bind();
    rescue._getSpace = jest.fn().mockReturnValue({
      isCaptive: jest.fn().mockReturnValue(true),
    });
    rescue._getUnit = jest.fn().mockReturnValue(unit);
    rescue.perform();
    expect(unit.isBound()).toBe(false);
    expect(unit.position).not.toBeNull();
    expect(warrior.earnPoints.mock.calls.length).toBe(0);
  });

  it('should do nothing to other unit if not bound', () => {
    const unit = new Unit();
    unit.position = {};
    unit.say = () => {};
    rescue._getSpace = jest.fn().mockReturnValue({
      isCaptive: jest.fn().mockReturnValue(false),
    });
    rescue.perform();
    expect(unit.position).not.toBeNull();
    expect(warrior.earnPoints.mock.calls.length).toBe(0);
  });
});