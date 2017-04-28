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
    bind.getUnit = jest.fn().mockReturnValue(receiver);
    bind.perform();
    expect(receiver.isBound()).toBe(true);
  });

  it('should do nothing if no recipient', () => {
    bind.getUnit = jest.fn().mockReturnValue(null);
    expect(() => {
      bind.perform();
    }).not.toThrow();
  });
});
