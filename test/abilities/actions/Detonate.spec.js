import Captive from '../../../src/units/Captive';
import Detonate from '../../../src/abilities/actions/Detonate';
import Explode from '../../../src/abilities/actions/Explode';
import Floor from '../../../src/Floor';
import Unit from '../../../src/units/Unit';
import Warrior from '../../../src/units/Warrior';

describe('Detonate', () => {
  let detonate;
  let floor;
  let warrior;

  beforeEach(() => {
    floor = new Floor(2, 3);
    warrior = new Warrior();
    floor.addUnit(warrior, { x: 0, y: 0, direction: 'south' });
    detonate = new Detonate(warrior);
  });

  it('should subtract 8 from target (forward) unit and 4 from surrounding units', () => {
    const targetUnit = new Unit();
    targetUnit.health = 15;
    const otherUnit = new Unit();
    otherUnit.health = 15;
    floor.addUnit(targetUnit, { x: 0, y: 1 });
    floor.addUnit(otherUnit, { x: 1, y: 1 });
    detonate.perform();
    expect(targetUnit.health).toBe(7);
    expect(otherUnit.health).toBe(11);
  });

  it('should subtract 8 from target (left) unit and 4 from surrounding units', () => {
    const targetUnit = new Unit();
    targetUnit.health = 15;
    const otherUnit = new Unit();
    otherUnit.health = 15;
    floor.addUnit(targetUnit, { x: 1, y: 0 });
    floor.addUnit(otherUnit, { x: 1, y: 1 });
    detonate.perform('left');
    expect(targetUnit.health).toBe(7);
    expect(otherUnit.health).toBe(11);
  });

  it('should detonate an explosive if any unit has one', () => {
    const captive = new Captive();
    captive.health = 1;
    captive.abilities.set('explode', new Explode(captive));
    floor.addUnit(captive, { x: 1, y: 1 });
    detonate.perform();
    expect(captive.health).toBe(0);
    expect(warrior.health).toBe(0);
  });
});
