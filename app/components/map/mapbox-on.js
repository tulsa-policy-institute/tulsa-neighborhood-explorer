import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MapboxOnComponent extends Component {
  closure = this.args.action || (() => {});

  @tracked
  callbackEvent = null;

  @action
  callback(...args) {
    this.callbackEvent = args[0];

    this.closure(...args);
  }
}
