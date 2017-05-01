import { times } from 'lodash';

import Effect from '../../src/effects/Effect';
import Unit from '../../src/units/Unit';

describe('Effect', () => {
  let effect;
  let unit;

  beforeEach(() => {
    unit = new Unit();
    effect = new Effect(unit);
    unit.addEffect(effect);
  });

  it('should have a time which defaults to infinity', () => {
    expect(effect.time).toBe(Infinity);
  });

  it('should have no description', () => {
    expect(effect.description).toBeUndefined();
  });

  it('should be activated each turn', () => {
    effect.activate = jest.fn();
    effect.passTurn();
    expect(effect.activate.mock.calls.length).toBe(1);
  });

  describe('with finite time', () => {
    beforeEach(() => {
      effect.time = 10;
    });

    it('should count down time once each turn', () => {
      times(3, () => effect.passTurn());
      expect(effect.time).toBe(7);
    });

    it('should not count down time below zero', () => {
      times(11, () => effect.passTurn());
      expect(effect.time).toBe(0);
    });

    it('should remove itself from unit when time reaches zero', () => {
      expect(unit.effects.keys()).toContain('effect');
      times(10, () => effect.passTurn());
      expect(unit.effects.keys()).not.toContain('effect');
    });
  });
});
