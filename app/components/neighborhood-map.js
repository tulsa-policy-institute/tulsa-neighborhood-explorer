import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NeighborhoodMap extends Component {
  @service
  router;

  @action
  transitionTo(e) {
    const [feature] = e.features;
    this.router.transitionTo(`/profiles/${feature.properties.neighborhood}`);
  }
}
