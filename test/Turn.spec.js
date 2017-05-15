import Turn from '../src/Turn';
import Unit from '../src/Unit';

describe('Turn', () => {
  let turn;
  let unit;

  beforeEach(() => {
    unit = new Unit();
    unit.position = {
      getRelativeSpace: () => ({
        toPlayerObject: () => {},
      }),
    };
    const abilities = new Map([
      [
        'feel',
        {
          type: 'sense',
          perform: () => {},
        },
      ],
      [
        'walk',
        {
          type: 'action',
          perform: () => {},
        },
      ],
    ]);
    turn = new Turn(abilities);
  });

  it('should define a function for each ability passed to the constructor', () => {
    expect(turn).toHaveProperty('feel');
    expect(turn).toHaveProperty('walk');
  });

  describe('with actions', () => {
    it('should have no action performed at first', () => {
      expect(turn.action).toBeNull();
    });

    it('should be able to perform action and recall it', () => {
      turn.walk();
      expect(turn.action).toEqual(['walk', []]);
    });

    it('should include arguments passed to action', () => {
      turn.walk('forward');
      expect(turn.action).toEqual(['walk', ['forward']]);
    });

    it('should not be able to call multiple actions per turn', () => {
      turn.walk();
      expect(() => {
        turn.walk();
      }).toThrow('Only one action can be performed per turn.');
    });
  });

  describe('with senses', () => {
    it('should be able to call multiple senses per turn', () => {
      turn.feel();
      expect(() => {
        turn.feel('backward');
      }).not.toThrow();
    });
  });
});
