import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from '../config/environment';

const { 'maplibre-gl': maplibreGlConfig } = config;

export default class IndexRoute extends Route {
  @service
  mainMap;

  model() {
    return this.modelFor('application');
  }

  afterModel() {
    this.mainMap.run((map) => {
      map.flyTo({
        center: maplibreGlConfig.map.center,
        zoom: maplibreGlConfig.map.zoom,
      });
    });
  }
}
