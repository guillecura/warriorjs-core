import { TURN_CHANGED, UNIT_SPOKE, FLOOR_CHANGED } from './constants/eventTypes';

export default class Logger {
  static _events = [];

  static get events() {
    return Logger._events;
  }

  static turnChanged(turn) {
    Logger._events.push({
      type: TURN_CHANGED,
      turn,
    });
  }

  static unitSpoke(message, unitType) {
    Logger._events.push({
      type: UNIT_SPOKE,
      message,
      unitType,
    });
  }

  static floorChanged(floor) {
    Logger._events.push({
      type: FLOOR_CHANGED,
      floor,
    });
  }

  static clear() {
    Logger._events = [];
  }
}
