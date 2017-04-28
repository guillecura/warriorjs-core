import { times } from 'lodash';

import Explode from '../../../src/abilities/actions/Explode';
import Floor from '../../../src/Floor';
import Unit from '../../../src/units/Unit';

jest.mock('../../../src/Logger', () => ({
  unit: () => {},
}));

describe('Explode', () => {
  let explode;
  let floor;
  let unit;

  beforeEach(() => {
    floor = new Floor(2, 3);
    unit = new Unit();
    floor.addUnit(unit, { x: 0, y: 0 });
    explode = new Explode(unit, 3);
  });

  it('should explode when bomb time reaches zero', () => {
    unit.maxHealth = 1;
    times(2, () => explode.passTurn());
    expect(unit.getHealth()).toBe(1);
    explode.passTurn();
    expect(unit.getHealth()).toBe(0);
  });

  it('should kill every unit on the floor', () => {
    floor.addUnit(unit, { x: 0, y: 1 });
    unit.maxHealth = Number.MAX_SAFE_INTEGER;
    explode.perform();
    expect(unit.getHealth()).toBe(0);
  });
});
