import Feel from '../src/abilities/senses/Feel';
import Turn from '../src/Turn';

describe('Turn', () => {
  let feel;
  let turn;

  beforeEach(() => {
    feel = new Feel({});
    feel._getSpace = jest.fn().mockReturnValue({ toPlayerObject: () => {} });
    turn = new Turn({
      feel,
      walk: null,
      attack: null,
    });
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
        turn.attack();
      }).toThrow('Only one action can be performed per turn.');
    });
  });

  describe('with senses', () => {
    it('should be able to call multiple senses per turn', () => {
      turn.feel();
      expect(() => {
        turn.feel('backward');
      }).not.toThrow();
      expect(turn.action).toBeNull();
    });
  });

  describe('player object', () => {
    let playerObject;

    beforeEach(() => {
      playerObject = turn.toPlayerObject();
    });

    it('should be able to call actions and senses', () => {
      expect(() => {
        playerObject.feel();
        playerObject.attack();
      }).not.toThrow();
    });

    it('should not be able to access restricted properties', () => {
      expect(playerObject._addAction).toBeUndefined();
      expect(playerObject._addSense).toBeUndefined();
      expect(playerObject.action).toBeUndefined();
      expect(playerObject._action).toBeUndefined();
      expect(playerObject._senses).toBeUndefined();
    });
  });
});
