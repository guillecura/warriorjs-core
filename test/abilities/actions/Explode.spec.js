import { times } from 'lodash';

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
    floor.addUnit(captive, { x: 0, y: 0 });
    explode = new Explode(captive, 3);
  });

  it('should explode when bomb time reaches zero', () => {
    captive.health = 10;
    times(2, () => explode.passTurn());
    expect(captive.getHealth()).toBe(10);
    explode.passTurn();
    expect(captive.getHealth()).toBe(0);
  });

  it('should kill every unit on the floor', () => {
    const unit = new Unit();
    unit.health = 101;
    floor.addUnit(unit, { x: 0, y: 1 });
    captive.health = 10;
    explode.perform();
    expect(captive.getHealth()).toBe(0);
    expect(unit.getHealth()).toBe(0);
  });
});
