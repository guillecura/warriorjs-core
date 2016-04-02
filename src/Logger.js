export default class Logger {
  static _events = [];

  static get events() {
    return Logger._events;
  }

  static log(eventType, payload) {
    Logger._events.push({
      eventType,
      payload,
    });
  }

  static clear() {
    Logger._events = [];
  }
}
