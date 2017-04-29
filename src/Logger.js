const Logger = {
  events: [],
  clear() {
    Logger.events = [];
  },
  turn() {
    const turnEvents = [];
    Logger.events.push(turnEvents);
  },
  unit(unit, state, message) {
    const turnEvents = Logger.events[Logger.events.length - 1];
    turnEvents.push({
      message,
      state,
      unit: unit.toViewObject(),
    });
  },
};

export default Logger;
