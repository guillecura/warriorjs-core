import Bind from '../../../src/abilities/actions/Bind';
import Unit from '../../../src/units/Unit';

describe('Bind', () => {
  let bind;
  let captor;

  beforeEach(() => {
    captor = new Unit();
    captor.say = () => {};
    bind = new Bind(captor);
  });

  it('should bind receiver', () => {
    const receiver = new Unit();
    captor.position = {
      getRelativeSpace: () => ({
        getUnit: () => receiver,
      }),
    };
    bind.perform();
    expect(receiver.isBound()).toBe(true);
  });

  it('should do nothing if no recipient', () => {
    captor.position = {
      getRelativeSpace: () => ({
        getUnit: () => undefined,
      }),
    };
    expect(() => {
      bind.perform();
    }).not.toThrow();
  });
});
