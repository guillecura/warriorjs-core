import Feel from '../src/abilities/senses/Feel';
import Turn from '../src/Turn';

describe('Turn', () => {
  let feel;
  let turn;

  beforeEach(() => {
    feel = new Feel({});
    feel.getSpace = () => ({ toPlayerObject: () => {} });
    const abilities = new Map([['feel', feel], ['attack', null], ['walk', null]]);
    turn = new Turn(abilities);
  });

  it('should define a function for each ability passed to the constructor', () => {
    expect(turn).toHaveProperty('feel');
    expect(turn).toHaveProperty('attack');
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
      expect(playerObject.addAction).toBeUndefined();
      expect(playerObject.addSense).toBeUndefined();
      expect(playerObject.action).toBeUndefined();
      expect(playerObject.senses).toBeUndefined();
    });
  });
});
