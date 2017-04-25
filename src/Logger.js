import { FLOOR_CHANGED, PLAY_STARTED, TURN_CHANGED, UNIT_SPOKE } from './constants/eventTypes';

export default class Logger {
  static _events = [];

  static get events() {
    return Logger._events;
  }

  static playStarted(initialFloor) {
    Logger._events.push({
      type: PLAY_STARTED,
      initialFloor,
    });
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
