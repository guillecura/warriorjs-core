import Captive from '../src/units/Captive';
import Explode from '../src/abilities/actions/Explode';
import Floor from '../src/Floor';
import Sludge from '../src/units/Sludge';
import Warrior from '../src/units/Warrior';

describe('Space', () => {
  let floor;

  beforeEach(() => {
    floor = new Floor(2, 3);
  });

  describe('with empty space', () => {
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

    it('should not be captive', () => {
      expect(space.isCaptive()).toBe(false);
    });

    it('should not be ticking', () => {
      expect(space.isTicking()).toBe(false);
    });

    it('should have name "nothing"', () => {
      expect(space.toString()).toEqual('nothing');
    });
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

  describe('with warrior', () => {
    let space;

    beforeEach(() => {
      floor.addUnit(new Warrior(), { x: 0, y: 0 });
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

    it('should know what unit is on that space', () => {
      expect(space.getUnit()).toBeInstanceOf(Warrior);
    });
  });

  describe('with enemy', () => {
    let space;

    beforeEach(() => {
      floor.addUnit(new Sludge(), { x: 0, y: 0 });
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

      it('should be captive', () => {
        expect(space.isCaptive()).toBe(true);
      });

      it('should not look like enemy', () => {
        expect(space.isEnemy()).toBe(false);
      });
    });
  });

  describe('with captive', () => {
    let captive;
    let space;

    beforeEach(() => {
      captive = new Captive();
      floor.addUnit(captive, { x: 0, y: 0 });
      space = floor.getSpaceAt(0, 0);
    });

    it('should be captive', () => {
      expect(space.isCaptive()).toBe(true);
    });

    it('should not be enemy', () => {
      expect(space.isEnemy()).toBe(false);
    });

    it('should be ticking if captive has time bomb', () => {
      captive.abilities.set('explode', new Explode(captive));
      expect(space.isTicking()).toBe(true);
    });

    it('should not be ticking if captive does not have time bomb', () => {
      expect(space.isTicking()).toBe(false);
    });
  });

  describe('player object', () => {
    let space;
    let playerObject;

    beforeEach(() => {
      space = floor.getSpaceAt(0, 0);
      playerObject = space.toPlayerObject();
    });

    it('should be able to call informational methods', () => {
      expect(playerObject.isWall).toBeDefined();
      expect(playerObject.isWarrior).toBeDefined();
      expect(playerObject.isPlayer).toBeDefined();
      expect(playerObject.isEnemy).toBeDefined();
      expect(playerObject.isCaptive).toBeDefined();
      expect(playerObject.isTicking).toBeDefined();
      expect(playerObject.isEmpty).toBeDefined();
      expect(playerObject.isStairs).toBeDefined();
    });

    it('should not be able to access restricted properties', () => {
      expect(playerObject.floor).toBeUndefined();
      expect(playerObject.location).toBeUndefined();
      expect(playerObject.unit).toBeUndefined();
      expect(playerObject.x).toBeUndefined();
      expect(playerObject.y).toBeUndefined();
    });
  });
});
