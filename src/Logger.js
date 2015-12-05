export default class Logger {
  static _entries = [];

  static get entries() {
    return Logger._entries;
  }

  static log(unitType, message) {
    Logger._entries.push({
      unitType,
      message,
    });
  }

  static clear() {
    Logger._entries = [];
  }
}
