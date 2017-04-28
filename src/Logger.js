const Logger = {
  events: [],
  clear() {
    Logger.events = [];
  },
  turn() {
    Logger.events.push([]);
  },
  unit(unit, message) {
    Logger.events[Logger.events.length - 1].push({
      message,
      unit: unit.toViewObject(),
    });
  },
};

export default Logger;
