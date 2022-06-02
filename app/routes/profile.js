import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import bbox from '@turf/bbox';

export default class ProfileRoute extends Route {
  @service
  mainMap;

  @service
  media;

  model(params) {
    const { neighborhoods, neighborhoodsGeoJson } =
      this.modelFor('application');
    const feature = neighborhoodsGeoJson.features.find(
      (n) => n.properties.slug === params.id
    );

    return {
      feature,
      ...neighborhoods.find((n) => n.slug === params.id),
    };
  }

  afterModel({ feature }) {
    this.zoomToProfileGeography(feature);
  }

  zoomToProfileGeography(feature) {
    const neighborhoodBounds = bbox(feature);

    this.mainMap.run((map) => {
      map.fitBounds(neighborhoodBounds, {
        padding: this.media.isMobile ? 0 : 75,
      });
    });
  }
}
