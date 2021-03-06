import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SearchBarComponent extends Component {
  @service
  router;

  @action
  transitionTo(neighborhood) {
    this.router.transitionTo(`/profiles/${neighborhood.slug}`);
  }
}
