class Logger {
  static _log;

  static getLog() {
    return Logger._log;
  }

  static log(unitType, message) {
    Logger._log.push({
      unitType,
      message,
    });
  }

  static clear() {
    Logger._log = [];
  }
}

export default Logger;
