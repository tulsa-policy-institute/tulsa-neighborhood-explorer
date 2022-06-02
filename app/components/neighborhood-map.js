import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NeighborhoodMap extends Component {
  @service
  router;

  @service
  mainMap;

  @action
  transitionTo(e) {
    const [feature] = e.features;

    this.router.transitionTo(`/profiles/${feature.properties.slug}`);
  }

  @action
  didLoad(map) {
    // this.mainMap.setMap(map);
  }
}
