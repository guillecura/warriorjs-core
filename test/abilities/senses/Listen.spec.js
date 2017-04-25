import Listen from '../../../src/abilities/senses/Listen';
import Unit from '../../../src/units/Unit';
import Warrior from '../../../src/units/Warrior';
import Floor from '../../../src/Floor';

describe('Listen', () => {
  it('should return an array of spaces which have units on them besides main unit', () => {
    const floor = new Floor(2, 3);
    const warrior = new Warrior();
    floor.addUnit(warrior, 0, 0);
    const listen = new Listen(warrior);
    floor.addUnit(new Unit(), 0, 1);
    expect(listen.perform().length).toBe(1);
  });
});
