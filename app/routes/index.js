import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from '../config/environment';

const { 'mapbox-gl': mapboxGlConfig } = config;

export default class IndexRoute extends Route {
  @service
  mainMap;

  model() {
    return this.modelFor('application');
  }

  afterModel() {
    this.mainMap.run((map) => {
      map.flyTo({
        center: mapboxGlConfig.map.center,
        zoom: mapboxGlConfig.map.zoom,
      });
    });
  }
}
