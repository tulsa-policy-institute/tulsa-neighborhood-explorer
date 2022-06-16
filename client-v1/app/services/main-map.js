import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MainMapService extends Service {
  queue = [];

  @tracked
  map = null;

  setMap(map) {
    this.map = map;

    if (this.queue.length) {
      const lastCallback = this.queue.pop();

      const { instance } = this.map;
      lastCallback(instance);
    }
  }

  run(callback) {
    if (this.map) {
      const { instance } = this.map;

      callback(instance);
    } else {
      this.queue.push(callback);
    }
  }
}
