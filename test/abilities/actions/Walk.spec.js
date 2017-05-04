import Walk from '../../../src/abilities/actions/Walk';

describe('Walk', () => {
  let walk;
  let space;
  let unit;

  beforeEach(() => {
    space = {
      isEmpty: () => true,
    };
    unit = {
      position: {
        getRelativeSpace: () => space,
        move: jest.fn(),
      },
      isAlive: () => true,
      say: () => {},
    };
    walk = new Walk(unit);
  });

  it('should move forward when calling perform', () => {
    walk.perform();
    expect(unit.position.move.mock.calls[0]).toEqual(['forward']);
  });

  it('should move right if that is the direction', () => {
    walk.perform('right');
    expect(unit.position.move.mock.calls[0]).toEqual(['right']);
  });

  it('should not move if something is in the way', () => {
    space.isEmpty = () => false;
    expect(() => {
      walk.perform('right');
    }).not.toThrow();
    expect(unit.position.move.mock.calls.length).toBe(0);
  });
});
