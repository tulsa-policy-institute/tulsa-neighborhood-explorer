import Service from '@ember/service';

export default class MainMapService extends Service {
  queue = [];

  map = null;

  setMap(map) {
    this.map = map;

    if (this.queue.length) {
      const lastCallback = this.queue.pop();

      lastCallback(this.map);
    }
  }

  run(callback) {
    if (this.map) {
      callback(this.map);
    } else {
      this.queue.push(callback);
    }
  }
}
