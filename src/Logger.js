import { FLOOR_CHANGED, PLAY_STARTED, TURN_CHANGED, UNIT_SPOKE } from './constants/eventTypes';

let events = [];

export default class Logger {
  static playStarted(initialFloor) {
    events.push({
      type: PLAY_STARTED,
      initialFloor,
    });
  }

  static turnChanged(turn) {
    events.push({
      type: TURN_CHANGED,
      turn,
    });
  }

  static unitSpoke(message, unitType) {
    events.push({
      type: UNIT_SPOKE,
      message,
      unitType,
    });
  }

  static floorChanged(floor) {
    events.push({
      type: FLOOR_CHANGED,
      floor,
    });
  }

  static clear() {
    events = [];
  }
}
