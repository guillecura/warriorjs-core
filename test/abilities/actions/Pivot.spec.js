import Pivot from '../../../src/abilities/actions/Pivot';

describe('Pivot', () => {
  let pivot;
  let position;

  beforeEach(() => {
    position = {
      rotate: jest.fn(),
    };
    pivot = new Pivot({
      position,
      say: () => {},
    });
  });

  it('should flip around when not passing arguments', () => {
    pivot.perform();
    expect(position.rotate.mock.calls[0][0]).toBe(2);
  });

  it('should rotate right when pivoting right', () => {
    pivot.perform('right');
    expect(position.rotate.mock.calls[0][0]).toBe(1);
  });
});
