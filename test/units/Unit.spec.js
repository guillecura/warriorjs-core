import Position from '../../src/Position';
import Unit from '../../src/units/Unit';

describe('Unit', () => {
  let unit;

  beforeEach(() => {
    unit = new Unit(0);
    unit.position = new Position(null, 0, 0, 'north');
  });

  it('should have an index property set by the constructor', () => {
    expect(unit.index).toBe(0);
  });

  it('should have a max health which defaults to zero', () => {
    expect(unit.maxHealth).toBe(0);
  });

  it('should have a health which defaults to max health', () => {
    unit.maxHealth = 10;
    expect(unit.getHealth()).toBe(10);
  });

  it('should have an attack power which defaults to zero', () => {
    expect(unit.attackPower).toBe(0);
  });

  it('should have a shoot power which defaults to zero', () => {
    expect(unit.shootPower).toBe(0);
  });

  it('should consider itself alive with position', () => {
    expect(unit.isAlive()).toBe(true);
  });

  it('should consider itself dead when no position', () => {
    unit.position = null;
    expect(unit.isAlive()).toBe(false);
  });

  describe('when taking damage', () => {
    beforeEach(() => {
      unit.maxHealth = 10;
    });

    it('should subtract health', () => {
      unit.takeDamage(3);
      expect(unit.getHealth()).toBe(7);
    });

    it('should not go under zero health', () => {
      unit.takeDamage(11);
      expect(unit.getHealth()).toBe(0);
    });

    it('should die when running out of health', () => {
      unit.takeDamage(10);
      expect(unit.isAlive()).toBe(false);
    });

    it('should be released from bonds', () => {
      unit.bind();
      expect(unit.isBound()).toBe(true);
      unit.takeDamage(2);
      expect(unit.isBound()).toBe(false);
    });
  });

  it('should be bound after calling bind', () => {
    unit.bind();
    expect(unit.isBound()).toBe(true);
  });

  describe('when bound', () => {
    beforeEach(() => {
      unit.bind();
    });

    it('should not perform action', () => {
      unit.position = null;
      const walk = {
        passTurn: () => {},
        perform: jest.fn(),
      };
      unit.abilities.set('walk', walk);
      const turn = {
        action: ['walk', ['backward']],
      };
      unit.getNextTurn = jest.fn().mockReturnValue(turn);
      unit.prepareTurn();
      unit.performTurn();
      expect(walk.perform.mock.calls.length).toBe(0);
    });

    it('should be released from bonds when calling unbind', () => {
      unit.unbind();
      expect(unit.isBound()).toBe(false);
    });
  });

  it('should return name in toString', () => {
    expect(unit.getName()).toEqual('Unit');
    expect(unit.toString()).toEqual('Unit');
  });

  it('should prepare turn by calling playTurn with next turn object', () => {
    unit.getNextTurn = jest.fn().mockReturnValue('nextTurn');
    unit.playTurn = jest.fn();
    unit.prepareTurn();
    expect(unit.playTurn.mock.calls[0][0]).toEqual('nextTurn');
  });

  it('should call passTurn on abilities when calling perform on turn', () => {
    const walk = {
      passTurn: jest.fn(),
    };
    unit.abilities.set('walk', walk);
    unit.prepareTurn();
    unit.performTurn();
    expect(walk.passTurn.mock.calls.length).toBe(1);
  });

  it('should perform action when calling perform on turn', () => {
    const walk = {
      passTurn: () => {},
      perform: jest.fn(),
    };
    unit.abilities.set('walk', walk);
    const turn = {
      action: ['walk', ['backward']],
    };
    unit.getNextTurn = jest.fn().mockReturnValue(turn);
    unit.prepareTurn();
    unit.performTurn();
    expect(walk.perform.mock.calls[0][0]).toEqual('backward');
  });

  it('should not perform action when dead', () => {
    unit.position = null;
    const walk = {
      passTurn: () => {},
      perform: jest.fn(),
    };
    unit.abilities.set('walk', walk);
    const turn = {
      action: ['walk', ['backward']],
    };
    unit.getNextTurn = jest.fn().mockReturnValue(turn);
    unit.prepareTurn();
    unit.performTurn();
    expect(walk.perform.mock.calls.length).toBe(0);
  });

  it('should not throw when calling performTurn when there is no action', () => {
    unit.prepareTurn();
    expect(() => {
      unit.performTurn();
    }).not.toThrow();
  });

  describe('view object', () => {
    it('should have only view object properties', () => {
      expect(unit.toViewObject()).toEqual({
        index: 0,
        name: 'Unit',
        type: 'unit',
        position: {
          x: 0,
          y: 0,
          direction: 'north',
        },
        health: 0,
      });
    });
  });
});
