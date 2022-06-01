import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import bbox from '@turf/bbox';

export default class ProfileRoute extends Route {
  @service
  mainMap;

  model(params) {
    const { neighborhoods } = this.modelFor('application');

    return neighborhoods.find((n) => n.slug === params.id);
  }

  afterModel({ slug }) {
    const { neighborhoodsGeoJson } = this.modelFor('application');
    const feature = neighborhoodsGeoJson.features.find(
      (n) => n.properties.slug === slug
    );
    const neighborhoodBounds = bbox(feature);

    this.mainMap.run((map) => {
      map.fitBounds(neighborhoodBounds, { padding: 50 });
    });
  }
}
