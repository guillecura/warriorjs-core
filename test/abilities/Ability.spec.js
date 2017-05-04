import Ability from '../../src/abilities/Ability';
import Unit from '../../src/units/Unit';

describe('Ability', () => {
  let ability;
  let unit;

  beforeEach(() => {
    unit = new Unit();
    ability = new Ability(unit);
  });

  it('should have no description', () => {
    expect(ability.description).toBeUndefined();
  });
});
