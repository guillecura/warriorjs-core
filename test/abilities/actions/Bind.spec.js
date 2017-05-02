import Bind from '../../../src/abilities/actions/Bind';
import Unit from '../../../src/units/Unit';

jest.mock('../../../src/Logger', () => ({
  unit: () => {},
}));

describe('Bind', () => {
  let bind;
  let captor;

  beforeEach(() => {
    captor = {};
    bind = new Bind(captor);
  });

  it('should bind receiver', () => {
    const receiver = new Unit();
    bind.getUnit = () => receiver;
    bind.perform();
    expect(receiver.effects.keys()).toContain('bound');
  });

  it('should do nothing if no recipient', () => {
    bind.getUnit = () => undefined;
    expect(() => {
      bind.perform();
    }).not.toThrow();
  });
});
