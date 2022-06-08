import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import bbox from '@turf/bbox';
import fetch from 'fetch';

export default class ProfileRoute extends Route {
  @service
  mainMap;

  @service
  media;

  async model(params) {
    const { neighborhoods, neighborhoodsGeoJson } =
      this.modelFor('application');
    const feature = neighborhoodsGeoJson.features.find(
      (n) => n.properties.slug === params.id
    );

    const acs20 = await (await fetch('/census/data/2020/acs/acs5.json')).json();
    const acs15 = await (await fetch('/census/data/2015/acs/acs5.json')).json();
    const neighborhoodBounds = bbox(feature);

    return {
      feature,
      acs: acs20,
      acs15,
      neighborhoodBounds,
      ...neighborhoods.find((n) => n.slug === params.id),
    };
  }

  afterModel({ neighborhoodBounds }) {
    this.zoomToProfileGeography(neighborhoodBounds);
  }

  zoomToProfileGeography(bounds) {
    this.mainMap.run((map) => {
      map.fitBounds(bounds, {
        padding: this.media.isMobile ? 0 : 75,
      });
    });
  }
}
