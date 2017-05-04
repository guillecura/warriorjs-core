import { times } from 'lodash';

import Ticking from '../../src/effects/Ticking';
import Floor from '../../src/Floor';
import Unit from '../../src/units/Unit';

describe('Ticking', () => {
  let ticking;
  let floor;
  let unit;

  beforeEach(() => {
    floor = new Floor(2, 3);
    unit = new Unit();
    unit.say = () => {};
    floor.addUnit(unit, { x: 0, y: 0 });
    ticking = new Ticking(unit, 3);
  });

  it('should explode when bomb time reaches zero', () => {
    unit.maxHealth = 1;
    times(2, () => ticking.passTurn());
    expect(unit.getHealth()).toBe(1);
    ticking.passTurn();
    expect(unit.getHealth()).toBe(0);
  });

  it('should kill every unit on the floor', () => {
    floor.addUnit(unit, { x: 0, y: 1 });
    unit.maxHealth = Number.MAX_SAFE_INTEGER;
    ticking.explode();
    expect(unit.getHealth()).toBe(0);
  });
});
