const Logger = {
  events: [],
  clear() {
    Logger.events = [];
  },
  turn() {
    const turnEvents = [];
    Logger.events.push(turnEvents);
  },
  unit(unit, message) {
    const turnEvents = Logger.events[Logger.events.length - 1];
    turnEvents.push({
      message,
      unit: unit.toViewObject(),
    });
  },
};

export default Logger;
