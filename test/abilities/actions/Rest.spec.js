import Rest from '../../../src/abilities/actions/Rest';
import Unit from '../../../src/units/Unit';

describe('Rest', () => {
  it('should give 10% of max health back', () => {
    const unit = new Unit();
    unit.maxHealth = 10;
    unit.health = 3;
    unit.say = () => {};
    const rest = new Rest(unit);
    rest.perform();
    expect(unit.getHealth()).toBe(4);
  });
});
