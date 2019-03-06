export default class storeHandler {
  constructor() {
    this.events = {};
  }

  subscribe(event, cb) {
    if (this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }

    return this.events[event].push(cb);
  }

  publish(event, data = {}) {
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }

    return this.events[event].map(callback => callback(data));
  }
}
