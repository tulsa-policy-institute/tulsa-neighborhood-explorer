import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import bbox from '@turf/bbox';
import fetch from 'fetch';
import { filterForProfileTracts } from '../helpers/filter-for-profile-tracts';

export default class ProfileRoute extends Route {
  @service
  mainMap;

  @service
  media;

  queryParams = {
    showAssessment: {
      sticky: true,
    },
  };

  async model(params) {
    const { neighborhoods, neighborhoodsGeoJson } =
      this.modelFor('application');
    const feature = neighborhoodsGeoJson.features.find(
      (n) => n.properties.slug === params.id
    );

    const neighborhoodBounds = bbox(feature);
    const neighborhood = neighborhoods.find((n) => n.slug === params.id);

    return {
      feature,
      neighborhoodBounds,
      ...neighborhood,
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
