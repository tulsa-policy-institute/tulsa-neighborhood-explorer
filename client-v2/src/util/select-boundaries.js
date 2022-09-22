import { extractSlug } from './extract-slug';
import bbox from '@turf/bbox';
import { isMobile } from 'react-device-detect';

export const selectBoundary = (boundaries, map, slug) => {
  const feature = boundaries.features.find((n) => extractSlug(n.properties) === slug);
  const neighborhoodBounds = bbox(feature);

  map.setFeatureState({
    source: 'neighborhoods',
    id: feature.properties.map_id,
  }, {
    selected: true,
  });

  map.fitBounds(neighborhoodBounds, {
    padding: isMobile ? 0 : 75,
  });

  return () => {
    map.setFeatureState({
      source: 'neighborhoods',
      id: feature.properties.map_id,
    }, {
      selected: false,
    });
  }
}
