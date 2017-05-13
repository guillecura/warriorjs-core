import Floor from '../src/Floor';
import Unit from '../src/Unit';

describe('Space', () => {
  let floor;

  beforeEach(() => {
    const size = {
      height: 2,
      width: 3,
    };
    const stairs = {
      x: 0,
      y: 2,
    };
    floor = new Floor(size, stairs);
  });

  describe('out of bounds', () => {
    let space;

    beforeEach(() => {
      space = floor.getSpaceAt(-1, 1);
    });

    it('should not be empty', () => {
      expect(space.isEmpty()).toBe(false);
    });

    it('should be wall', () => {
      expect(space.isWall()).toBe(true);
    });

    it('should have name "wall"', () => {
      expect(space.toString()).toEqual('wall');
    });
  });

  describe('with nothing on it', () => {
    let space;

    beforeEach(() => {
      space = floor.getSpaceAt(0, 0);
    });

    it('should be empty', () => {
      expect(space.isEmpty()).toBe(true);
    });

    it('should not be enemy', () => {
      expect(space.isEnemy()).toBe(false);
    });

    it('should not be warrior', () => {
      expect(space.isWarrior()).toBe(false);
    });

    it('should not be wall', () => {
      expect(space.isWall()).toBe(false);
    });

    it('should not be stairs', () => {
      expect(space.isStairs()).toBe(false);
    });

    it('should not be bound', () => {
      expect(space.isBound()).toBe(false);
    });

    it('should have name "nothing"', () => {
      expect(space.toString()).toEqual('nothing');
    });
  });

  describe('with stairs', () => {
    let space;

    beforeEach(() => {
      space = floor.getSpaceAt(0, 2);
    });

    it('should be stairs', () => {
      expect(space.isStairs()).toBe(true);
    });

    it('should not be empty', () => {
      expect(space.isEmpty()).toBe(false);
    });
  });

  describe('with warrior', () => {
    let space;

    beforeEach(() => {
      floor.addUnit(new Unit('Warrior'), { x: 0, y: 0 });
      space = floor.getSpaceAt(0, 0);
    });

    it('should be warrior', () => {
      expect(space.isWarrior()).toBe(true);
    });

    it('should be player', () => {
      expect(space.isPlayer()).toBe(true);
    });

    it('should not be enemy', () => {
      expect(space.isEnemy()).toBe(false);
    });

    it('should not be empty', () => {
      expect(space.isEmpty()).toBe(false);
    });
  });

  describe('with enemy', () => {
    let space;

    beforeEach(() => {
      floor.addUnit(new Unit('Sludge'), { x: 0, y: 0 });
      space = floor.getSpaceAt(0, 0);
    });

    it('should be enemy', () => {
      expect(space.isEnemy()).toBe(true);
    });

    it('should not be warrior', () => {
      expect(space.isWarrior()).toBe(false);
    });

    it('should not be empty', () => {
      expect(space.isEmpty()).toBe(false);
    });

    it('should have name of unit', () => {
      expect(space.toString()).toEqual('Sludge');
    });

    describe('bound', () => {
      beforeEach(() => {
        space.getUnit().bind();
      });

      it('should be bound', () => {
        expect(space.isBound()).toBe(true);
      });

      it('should not look like enemy', () => {
        expect(space.isEnemy()).toBe(false);
      });
    });
  });

  describe('with bound unit', () => {
    let space;

    beforeEach(() => {
      const unit = new Unit();
      unit.bind();
      floor.addUnit(unit, { x: 0, y: 0 });
      space = floor.getSpaceAt(0, 0);
    });

    it('should be bound', () => {
      expect(space.isBound()).toBe(true);
    });

    it('should not be enemy', () => {
      expect(space.isEnemy()).toBe(false);
    });
  });

  describe('with unit with effect', () => {
    let space;
    let unit;

    beforeEach(() => {
      unit = new Unit();
      floor.addUnit(unit, { x: 0, y: 0 });
      space = floor.getSpaceAt(0, 0);
    });

    it('should be ticking if unit has ticking effect', () => {
      unit.addEffect('ticking');
      expect(space.is('ticking')).toBe(true);
    });

    it('should not be ticking if unit does not have ticking effect', () => {
      expect(space.is('ticking')).toBe(false);
    });
  });
});
