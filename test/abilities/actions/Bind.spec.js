import Bind from '../../../src/abilities/actions/Bind';
import Unit from '../../../src/units/Unit';

describe('Bind', () => {
  let bind;
  let captor;

  beforeEach(() => {
    captor = {
      say: () => {},
    };
    bind = new Bind(captor);
  });

  it('should bind receiver', () => {
    const receiver = new Unit();
    bind._getUnit = jest.fn().mockReturnValue(receiver);
    bind.perform();
    expect(receiver.isBound()).toBe(true);
  });

  it('should do nothing if no recipient', () => {
    bind._getUnit = jest.fn().mockReturnValue(null);
    expect(() => {
      bind.perform();
    }).not.toThrow();
  });
});
