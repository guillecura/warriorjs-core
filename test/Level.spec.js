import Floor from '../src/Floor';
import Level from '../src/Level';
import Unit from '../src/units/Unit';
import Warrior from '../src/units/Warrior';

describe('Level', () => {
  let floor;
  let level;

  beforeEach(() => {
    floor = new Floor(0, 0);
    level = new Level();
    level.floor = floor;
    level._failed = jest.fn().mockReturnValue(false);
    level.warrior = { score: () => {} };
  });

  it('should default time bonus to zero', () => {
    expect(level.timeBonus).toBe(0);
  });

  it('should consider passed when warrior is on stairs', () => {
    level.warrior = new Warrior();
    floor.addUnit(level.warrior, 0, 0, 'north');
    floor.placeStairs(0, 0);
    expect(level._passed()).toBe(true);
  });

  describe('playing', () => {
    it('should call prepareTurn and playTurn on each unit specified number of times', () => {
      const unit = new Unit();
      unit.prepareTurn = jest.fn();
      unit.performTurn = jest.fn();
      floor.addUnit(unit, 0, 0, 'north');
      level.play(2);
      expect(unit.prepareTurn.mock.calls.length).toBe(2);
      expect(unit.performTurn.mock.calls.length).toBe(2);
    });

    it('should return immediately when passed', () => {
      const unit = new Unit();
      unit.performTurn = jest.fn();
      floor.addUnit(unit, 0, 0, 'north');
      level._passed = jest.fn().mockReturnValue(true);
      level.play(2);
      expect(unit.performTurn.mock.calls.length).toBe(0);
    });

    it('should count down time bonus once each turn', () => {
      level.timeBonus = 10;
      level.play(3);
      expect(level.timeBonus).toBe(7);
    });

    it('should not count down time bonus below zero', () => {
      level.timeBonus = 2;
      level.play(5);
      expect(level.timeBonus).toBe(0);
    });
  });
});