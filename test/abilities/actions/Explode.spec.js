import times from 'lodash.times';

import Captive from '../../../src/units/Captive';
import Explode from '../../../src/abilities/actions/Explode';
import Floor from '../../../src/Floor';
import Unit from '../../../src/units/Unit';

describe('Explode', () => {
  let floor;
  let captive;
  let explode;

  beforeEach(() => {
    floor = new Floor(2, 3);
    captive = new Captive();
    floor.addUnit(captive, 0, 0);
    explode = new Explode(captive, 3);
  });

  it('should explode when bomb time reaches zero', () => {
    captive.health = 10;
    times(2, () => explode.passTurn());
    expect(captive.health).toBe(10);
    explode.passTurn();
    expect(captive.health).toBe(0);
  });

  it('should kill every unit on the floor', () => {
    const unit = new Unit();
    unit.health = 101;
    floor.addUnit(unit, 0, 1);
    captive.health = 10;
    explode.perform();
    expect(captive.health).toBe(0);
    expect(unit.health).toBe(0);
  });
});
