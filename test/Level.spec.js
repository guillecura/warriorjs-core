import Floor from '../src/Floor';
import Level from '../src/Level';
import Unit from '../src/Unit';

describe('Level', () => {
  let floor;
  let level;

  beforeEach(() => {
    const size = {
      height: 1,
      width: 2,
    };
    const stairs = {
      x: 1,
      y: 0,
    };
    floor = new Floor(size, stairs);
    level = new Level();
    level.floor = floor;
    level.warrior = new Unit('Warrior');
    floor.addUnit(level.warrior, { x: 0, y: 0, direction: 'east' });
  });

  it('should consider passed when warrior is on stairs', () => {
    level.warrior.position.move('forward');
    expect(level.passed()).toBe(true);
  });

  it('should consider failed when warrior is dead', () => {
    level.warrior.position = null;
    expect(level.failed()).toBe(true);
  });

  describe('playing', () => {
    it('should call prepareTurn and playTurn on each unit specified number of times', () => {
      const unit = new Unit();
      unit.prepareTurn = jest.fn();
      unit.performTurn = jest.fn();
      floor.addUnit(unit, { x: 0, y: 0 });
      level.play(2);
      expect(unit.prepareTurn.mock.calls.length).toBe(2);
      expect(unit.performTurn.mock.calls.length).toBe(2);
    });

    it('should return immediately when passed', () => {
      const unit = new Unit();
      unit.performTurn = jest.fn();
      floor.addUnit(unit, { x: 0, y: 0 });
      level.passed = () => true;
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
