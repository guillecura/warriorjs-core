import Position from '../src/Position';
import Unit from '../src/Unit';

describe('Unit', () => {
  let unit;

  beforeEach(() => {
    unit = new Unit('Unit', 10);
    unit.position = new Position(null, 0, 0, 'north');
    unit.say = () => {};
  });

  it('should be able to set name', () => {
    unit.name = 'Joe';
    expect(unit.getName()).toEqual('Joe');
  });

  it('should default name to type', () => {
    expect(unit.getName()).toEqual('Unit');
    unit.name = '';
    expect(unit.getName()).toEqual('Unit');
  });

  it('should start with a score of zero', () => {
    expect(unit.score).toBe(0);
  });

  it('should have a health which defaults to max health', () => {
    expect(unit.health).toBe(10);
  });

  it('should consider itself alive with position', () => {
    expect(unit.isAlive()).toBe(true);
  });

  it('should consider itself dead when no position', () => {
    unit.position = null;
    expect(unit.isAlive()).toBe(false);
  });

  it('should be able to earn points', () => {
    unit.earnPoints(5);
    expect(unit.score).toBe(5);
  });

  it('should be proud of earning points if is Warrior', () => {
    unit.type = 'Warrior';
    unit.say = jest.fn();
    unit.earnPoints(5);
    expect(unit.say.mock.calls[0][0]).toEqual('earns 5 points');
  });

  describe('when healing', () => {
    it('should add health', () => {
      unit.health = 5;
      unit.heal(3);
      expect(unit.health).toBe(8);
    });

    it('should not go over max health', () => {
      unit.health = 9;
      unit.heal(2);
      expect(unit.health).toBe(10);
    });

    it('should not add health when at max', () => {
      unit.heal(1);
      expect(unit.health).toBe(10);
    });
  });

  describe('when taking damage', () => {
    it('should subtract health', () => {
      unit.takeDamage(3);
      expect(unit.health).toBe(7);
    });

    it('should not go under zero health', () => {
      unit.takeDamage(11);
      expect(unit.health).toBe(0);
    });

    it('should die when running out of health', () => {
      unit.takeDamage(10);
      expect(unit.isAlive()).toBe(false);
    });
  });

  it('should be able to damage another unit', () => {
    const receiver = new Unit('Unit', 10);
    receiver.position = new Position(null, 0, 1, 'north');
    receiver.say = () => {};
    unit.damage(receiver, 3);
    expect(receiver.health).toBe(7);
  });

  describe('when dealing damage', () => {
    let receiver;

    beforeEach(() => {
      receiver = new Unit('Unit', 5);
      receiver.position = new Position(null, 0, 1, 'north');
      receiver.say = () => {};
    });

    it('should earn points equal to max health when killing unit', () => {
      unit.earnPoints = jest.fn();
      unit.damage(receiver, 5);
      expect(unit.earnPoints.mock.calls[0][0]).toBe(5);
    });

    it('should not earn points when not killing unit', () => {
      unit.earnPoints = jest.fn();
      unit.damage(receiver, 3);
      expect(unit.earnPoints.mock.calls.length).toBe(0);
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
        perform: jest.fn(),
      };
      unit.addAbility('walk', walk);
      unit.turn = {
        action: ['walk', ['backward']],
      };
      unit.performTurn();
      expect(walk.perform.mock.calls.length).toBe(0);
    });

    it('should be released from bonds when calling unbind', () => {
      unit.unbind();
      expect(unit.isBound()).toBe(false);
    });

    it('should be released from bonds when taking damage', () => {
      unit.takeDamage(2);
      expect(unit.isBound()).toBe(false);
    });
  });

  it('should prepare turn by calling playTurn with next turn object', () => {
    unit.getNextTurn = jest.fn().mockReturnValue('nextTurn');
    unit.playTurn = jest.fn();
    unit.prepareTurn();
    expect(unit.playTurn.mock.calls[0][0]).toEqual('nextTurn');
  });

  it('should call passTurn on effects when calling perform on turn', () => {
    const ticking = {
      passTurn: jest.fn(),
    };
    unit.addEffect('ticking', ticking);
    unit.turn = {
      action: null,
    };
    unit.performTurn();
    expect(ticking.passTurn.mock.calls.length).toBe(1);
  });

  it('should perform action when calling perform on turn', () => {
    const walk = {
      perform: jest.fn(),
    };
    unit.addAbility('walk', walk);
    unit.turn = {
      action: ['walk', ['backward']],
    };
    unit.performTurn();
    expect(walk.perform.mock.calls[0][0]).toEqual('backward');
  });

  it('should not perform action when dead', () => {
    unit.position = null;
    const walk = {
      perform: jest.fn(),
    };
    unit.addAbility('walk', walk);
    unit.turn = {
      action: ['walk', []],
    };
    unit.performTurn();
    expect(walk.perform.mock.calls.length).toBe(0);
  });

  it('should not throw when calling performTurn when there is no action', () => {
    unit.prepareTurn();
    expect(() => {
      unit.performTurn();
    }).not.toThrow();
  });

  it('should be upset for not doing nothing if is Warrior', () => {
    unit.type = 'Warrior';
    unit.say = jest.fn();
    unit.prepareTurn();
    unit.performTurn();
    expect(unit.say.mock.calls[0][0]).toEqual('does nothing');
  });

  it('should return object for visual representation in toViewObject', () => {
    unit.name = 'Spartacus';
    unit.type = 'Warrior';
    const walk = {
      description: 'Foo',
    };
    unit.addAbility('walk', walk);
    const ticking = {
      description: 'Foo',
    };
    unit.addEffect('ticking', ticking);
    expect(unit.toViewObject()).toEqual({
      name: 'Spartacus',
      type: 'Warrior',
      position: {
        x: 0,
        y: 0,
        direction: 'north',
      },
      maxHealth: 10,
      health: 10,
      score: 0,
      bound: false,
      abilities: [
        {
          name: 'walk',
          description: 'Foo',
        },
      ],
      effects: [
        {
          name: 'ticking',
          description: 'Foo',
        },
      ],
    });
  });

  it('should return name in toString', () => {
    expect(unit.getName()).toEqual('Unit');
    expect(unit.toString()).toEqual('Unit');
  });
});
