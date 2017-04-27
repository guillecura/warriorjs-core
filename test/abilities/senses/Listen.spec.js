import Floor from '../../../src/Floor';
import Listen from '../../../src/abilities/senses/Listen';
import Unit from '../../../src/units/Unit';
import Warrior from '../../../src/units/Warrior';

describe('Listen', () => {
  it('should return an array of spaces which have units on them besides main unit', () => {
    const floor = new Floor(2, 3);
    const warrior = new Warrior();
    floor.addUnit(warrior, { x: 0, y: 0 });
    const listen = new Listen(warrior);
    floor.addUnit(new Unit(), { x: 0, y: 1 });
    expect(listen.perform().length).toBe(1);
  });
});
