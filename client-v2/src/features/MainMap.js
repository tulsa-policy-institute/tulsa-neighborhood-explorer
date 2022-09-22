import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { extractSlug } from '../util/extract-slug';
import { fetcher } from '../util/fetcher';
import Map from '../ui/Map';
import { selectBoundary } from '../util/select-boundaries';

export const MapContext = createContext();
const NSA_BOUNDARIES_URL = '/data/nsa_boundaries.json';

// issue: it re-renders the map because the data changes (fair)
// but, the jsx doesn't depend on the data, the didLoad callback does
// this withholds rendering unless there's data... preventing a double render...
// but what's a better solution? so that the map can load while the other data
// loads...

// TODO: https://www.patterns.dev/posts/provider-pattern/
// TODO: consider using dummy data and set-data for null state: 
//   https://github.com/chriswhong/nyc-311-digest/blob/36d041768438c28c6bc71372cf0da7b40787137b/src/features/report/ReportMapElements.js#L16
function MainMap({ onLoad }) {
  const { data: boundaries } = useSWR(NSA_BOUNDARIES_URL, fetcher);
  const navigate = useNavigate();

  const didLoad = (map) => {
    map.addSource('neighborhoods', {
      type: 'geojson',
      data: boundaries,
      promoteId: 'map_id',
    });

    map.addLayer({
      id: 'neighborhoods',
      source: 'neighborhoods',
      type: 'fill',
      paint: {
        'fill-color': 'DodgerBlue',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          0.4,
          0.2,
        ],
      },
      interactions: {
        hover: true,
        onClick: (e) => {
          const [feature] = e.features;
          const slug = extractSlug(feature.properties);

          navigate(`/profiles/${slug}`);
        },
      },
    });

    map.addLayer({
      id: 'neighborhood-lines',
      source: 'neighborhoods',
      type: 'line',
      paint: {
        'line-width': 1,
        'line-color': '#ae561f',
      },
    });

    map.addLayer({
      id: 'neighborhood-labels',
      source: 'neighborhoods',
      type: 'symbol',
      paint: {
        'text-color': 'rgba(66, 66, 66, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'white',
        'text-opacity': 0.75,
      },
      layout: {
        'text-field': '{neighborhood}',
        'text-allow-overlap': false,
        'symbol-placement': 'point',
      },
    });

    onLoad({
      map,
      selectBoundary: (slug) => {
        return selectBoundary(boundaries, map, slug);
      },
    });
  };

  return <>
    {boundaries && <Map
      onLoad={didLoad}
    />}
  </>;
};

export default MainMap;
