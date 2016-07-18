import { TURN, UNIT } from './constants/eventTypes';

export default class Logger {
  static _events = [];

  static get events() {
    return Logger._events;
  }

  static turn(turn) {
    Logger._events.push({
      type: TURN,
      turn,
    });
  }

  static unit(unit, state, message) {
    Logger._events.push({
      type: UNIT,
      unit,
      state,
      message,
    });
  }

  static clear() {
    Logger._events = [];
  }
}
